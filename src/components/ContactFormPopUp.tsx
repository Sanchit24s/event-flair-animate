import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createContactSubmission } from "@/services/contactService";

interface ContactFormPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactFormPopup = ({ isOpen, onClose }: ContactFormPopupProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            const formPayload = {
                first_name: formData.get("firstName") as string,
                last_name: formData.get("lastName") as string,
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
                event_type: formData.get("eventType") as string,
                message: formData.get("message") as string,
            };

            await createContactSubmission({
                ...formPayload,
                event_type: formPayload.event_type as "wedding" | "corporate" | "private" | "other",
            });

            toast({
                title: "Message Sent!",
                description:
                    "Thank you for your inquiry. We'll get back to you within 24 hours.",
            });

            (e.target as HTMLFormElement).reset();
            onClose(); // Close the popup on successful submission
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive",
            });
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-6 md:px-8 py-4">
            <div className="bg-white rounded-3xl shadow-2xl p-3 sm:p-5 md:p-6 w-full max-w-[calc(100%-1rem)] sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700"
                >
                    <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h3 className="font-playfair text-base sm:text-xl md:text-2xl font-bold text-navy mb-2 sm:mb-3">
                    Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div>
                            <label className="block text-xs font-medium text-navy mb-1">
                                First Name *
                            </label>
                            <Input
                                name="firstName"
                                required
                                className="border-2 border-border focus:border-gold rounded-xl h-8 sm:h-9 text-xs sm:text-sm w-full"
                                placeholder="Amit"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-navy mb-1">
                                Last Name *
                            </label>
                            <Input
                                name="lastName"
                                required
                                className="border-2 border-border focus:border-gold rounded-xl h-8 sm:h-9 text-xs sm:text-sm w-full"
                                placeholder="Sharma"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div>
                            <label className="block text-xs font-medium text-navy mb-1">
                                Email Address *
                            </label>
                            <Input
                                name="email"
                                type="email"
                                required
                                className="border-2 border-border focus:border-gold rounded-xl h-8 sm:h-9 text-xs sm:text-sm w-full"
                                placeholder="amit.sharma@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-navy mb-1">
                                Phone Number
                            </label>
                            <Input
                                name="phone"
                                type="tel"
                                className="border-2 border-border focus:border-gold rounded-xl h-8 sm:h-9 text-xs sm:text-sm w-full"
                                placeholder="98765 43210"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-navy mb-1">
                            Event Type *
                        </label>
                        <Select name="eventType" required>
                            <SelectTrigger className="border-2 border-border focus:border-gold rounded-xl h-8 sm:h-9 text-xs sm:text-sm w-full">
                                <SelectValue placeholder="Select event type" className="text-xs sm:text-sm" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="wedding" className="text-xs sm:text-sm">Wedding</SelectItem>
                                <SelectItem value="corporate" className="text-xs sm:text-sm">Corporate Event</SelectItem>
                                <SelectItem value="private" className="text-xs sm:text-sm">Private Party</SelectItem>
                                <SelectItem value="other" className="text-xs sm:text-sm">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-navy mb-1">
                            Tell us about your event *
                        </label>
                        <Textarea
                            name="message"
                            required
                            className="border-2 border-border focus:border-gold rounded-xl h-16 sm:h-20 text-xs sm:text-sm resize-none w-full"
                            placeholder="Briefly describe your event..."
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gold-gradient text-navy font-semibold h-8 sm:h-9 text-xs sm:text-sm hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>Sending...</>
                        ) : (
                            <>
                                Send Message
                                <Send className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ContactFormPopup;