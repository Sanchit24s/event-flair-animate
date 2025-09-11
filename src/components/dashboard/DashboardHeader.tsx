import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, LogOut, RefreshCw } from "lucide-react";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type DashboardHeaderProps = {
    onRefresh: () => void;
    csvData: unknown[];
    csvFilename: string;
};

export const DashboardHeader = ({ onRefresh, csvData, csvFilename }: DashboardHeaderProps) => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
        navigate("/login");
    };
    return (
        <div className="bg-white border-b border-border">
            <div className="container-custom py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-between"
                >
                    <div>
                        <h1 className="font-playfair text-4xl font-bold text-navy mb-2">📊 Dashboard</h1>
                        <p className="text-muted-foreground text-lg">Manage and view all contact form submissions</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={onRefresh}
                            variant="outline"
                            className="border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh
                        </Button>
                        <CSVLink data={csvData} filename={csvFilename}>
                            <Button className="gold-gradient text-navy font-semibold hover:scale-105 transition-all duration-300">
                                <Download className="mr-2 h-4 w-4" />
                                Export CSV
                            </Button>
                        </CSVLink>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};


