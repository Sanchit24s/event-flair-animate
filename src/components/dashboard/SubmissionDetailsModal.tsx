import { motion } from "framer-motion";
import { X, User, Mail, Phone, Calendar, MessageSquare, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type ContactSubmission = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  event_type: string;
  message: string;
  created_at: string;
};

type SubmissionDetailsModalProps = {
  submission: ContactSubmission | null;
  isOpen: boolean;
  onClose: () => void;
};

const eventTypeColors = {
  wedding: "bg-rose-100 text-rose-800",
  corporate: "bg-blue-100 text-blue-800", 
  private: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-800",
};

export const SubmissionDetailsModal = ({
  submission,
  isOpen,
  onClose,
}: SubmissionDetailsModalProps) => {
  if (!submission) return null;

  const handleEmailClick = () => {
    window.open(`mailto:${submission.email}`, '_blank');
  };

  const handlePhoneClick = () => {
    if (submission.phone) {
      window.open(`tel:${submission.phone}`, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-2xl border-border">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-navy">
            Contact Submission Details
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-semibold text-navy">
                    {submission.first_name} {submission.last_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold text-navy hover:text-gold"
                    onClick={handleEmailClick}
                  >
                    {submission.email}
                  </Button>
                </div>
              </div>

              {submission.phone && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-semibold text-navy hover:text-gold"
                      onClick={handlePhoneClick}
                    >
                      {submission.phone}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Tag className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Event Type</p>
                  <Badge 
                    className={`${eventTypeColors[submission.event_type as keyof typeof eventTypeColors] || eventTypeColors.other} capitalize mt-1`}
                  >
                    {submission.event_type}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted On</p>
                  <p className="font-semibold text-navy">
                    {format(new Date(submission.created_at), "MMMM dd, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    at {format(new Date(submission.created_at), "h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-gold" />
              <h3 className="font-semibold text-navy">Event Details & Message</h3>
            </div>
            <div className="bg-muted/30 rounded-xl p-4">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {submission.message}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-border hover:bg-muted/50"
            >
              Close
            </Button>
            <Button
              onClick={handleEmailClick}
              className="gold-gradient text-navy font-semibold hover:scale-105 transition-all duration-300"
            >
              <Mail className="mr-2 h-4 w-4" />
              Reply via Email
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};