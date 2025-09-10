import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BarChart3, Download, Search, RefreshCw, Filter, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import { ContactSubmissionsTable } from "@/components/dashboard/ContactSubmissionsTable";
import { SubmissionDetailsModal } from "@/components/dashboard/SubmissionDetailsModal";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";

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

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const { toast } = useToast();

  // Fetch contact submissions
  const {
    data: submissions = [],
    isLoading,
    refetch,
    error
  } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as ContactSubmission[];
    },
  });

  // Filter and sort submissions
  const filteredSubmissions = useMemo(() => {
    let filtered = submissions.filter((submission) => {
      // Search filter
      const searchMatch = 
        submission.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (submission.phone && submission.phone.includes(searchTerm));

      // Event type filter
      const eventTypeMatch = eventTypeFilter === "all" || submission.event_type === eventTypeFilter;

      // Date range filter
      const submissionDate = new Date(submission.created_at);
      const dateMatch = 
        (!dateRange.from || submissionDate >= dateRange.from) &&
        (!dateRange.to || submissionDate <= dateRange.to);

      return searchMatch && eventTypeMatch && dateMatch;
    });

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [submissions, searchTerm, eventTypeFilter, dateRange, sortOrder]);

  // Paginate submissions
  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredSubmissions.slice(startIndex, endIndex);
  }, [filteredSubmissions, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredSubmissions.length / pageSize);

  // Handle row click
  const handleRowClick = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsDetailsModalOpen(true);
  };

  // Handle refresh
  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshed",
      description: "Contact submissions have been updated.",
    });
  };

  // Prepare CSV data
  const csvData = filteredSubmissions.map(submission => ({
    "First Name": submission.first_name,
    "Last Name": submission.last_name,
    "Email": submission.email,
    "Phone": submission.phone || "N/A",
    "Event Type": submission.event_type,
    "Message": submission.message,
    "Submission Date": format(new Date(submission.created_at), "MMM dd, yyyy - h:mm a"),
  }));

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load contact submissions.",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container-custom py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="font-playfair text-4xl font-bold text-navy mb-2">
                📊 Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage and view all contact form submissions
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-300"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <CSVLink
                data={csvData}
                filename={`contact-submissions-${format(new Date(), "yyyy-MM-dd")}.csv`}
              >
                <Button className="gold-gradient text-navy font-semibold hover:scale-105 transition-all duration-300">
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </CSVLink>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Filters Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8 bg-white rounded-2xl shadow-lg border-border">
            <CardHeader>
              <CardTitle className="flex items-center font-playfair text-navy">
                <Filter className="mr-2 h-5 w-5" />
                Filters & Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-border focus:border-gold rounded-xl h-11"
                  />
                </div>

                {/* Event Type Filter */}
                <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                  <SelectTrigger className="border-2 border-border focus:border-gold rounded-xl h-11">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="private">Private Party</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                {/* Date Range Picker */}
                <DateRangePicker
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />

                {/* Sort Order */}
                <Select value={sortOrder} onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}>
                  <SelectTrigger className="border-2 border-border focus:border-gold rounded-xl h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* Page Size */}
                <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                  <SelectTrigger className="border-2 border-border focus:border-gold rounded-xl h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="25">25 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results Summary */}
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Showing {paginatedSubmissions.length} of {filteredSubmissions.length} submissions
                </span>
                {(searchTerm || eventTypeFilter !== "all" || dateRange.from || dateRange.to) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setEventTypeFilter("all");
                      setDateRange({});
                      setCurrentPage(1);
                    }}
                    className="text-gold hover:bg-gold/10"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ContactSubmissionsTable
            submissions={paginatedSubmissions}
            isLoading={isLoading}
            onRowClick={handleRowClick}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </motion.div>

        {/* Details Modal */}
        <SubmissionDetailsModal
          submission={selectedSubmission}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;