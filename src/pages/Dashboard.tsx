import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { useToast } from "@/hooks/use-toast";
import { ContactSubmissionsTable } from "@/components/dashboard/ContactSubmissionsTable";
import { SubmissionDetailsModal } from "@/components/dashboard/SubmissionDetailsModal";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import {
  getSubmissions,
  ContactSubmission,
  GetSubmissionsResponse,
} from "@/services/contactService";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "contacted">("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date; }>({});
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { toast } = useToast();

  // Debounce search term to limit API calls while typing
  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Fetch from backend
  const {
    data,
    isLoading,
    refetch,
    error,
  } = useQuery<GetSubmissionsResponse>({
    queryKey: [
      "contact-submissions",
      debouncedSearch,
      eventTypeFilter,
      statusFilter,
      dateRange,
      sortOrder,
      currentPage,
      pageSize,
    ],
    queryFn: async () =>
      getSubmissions({
        search: debouncedSearch || undefined,
        event_type: eventTypeFilter !== "all" ? eventTypeFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        from: dateRange.from ? dateRange.from.toISOString() : undefined,
        to: dateRange.to ? dateRange.to.toISOString() : undefined,
        page: currentPage,
        limit: pageSize,
        sort: sortOrder,
      }),
  });

  // ✅ Always safe
  const submissions: ContactSubmission[] = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  // Row click handler
  const handleRowClick = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsDetailsModalOpen(true);
  };

  // Refresh handler
  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshed",
      description: "Contact submissions have been updated.",
    });
  };

  // CSV Export data
  const csvData = submissions.map((submission) => ({
    "First Name": submission.first_name,
    "Last Name": submission.last_name,
    "Email": submission.email,
    "Phone": submission.phone || "N/A",
    "Event Type": submission.event_type,
    "Message": submission.message,
    "Status": submission.status,
    "Submission Date": submission.createdAt
      ? format(new Date(submission.createdAt), "MMM dd, yyyy - h:mm a")
      : "N/A",
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
      <DashboardHeader
        onRefresh={handleRefresh}
        csvData={csvData}
        csvFilename={`contact-submissions-${format(new Date(), "yyyy-MM-dd")}.csv`}
      />

      {/* Main Content */}
      <div className="container-custom py-8">
        <DashboardFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          eventTypeFilter={eventTypeFilter}
          setEventTypeFilter={setEventTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ContactSubmissionsTable
            submissions={submissions as any}
            isLoading={isLoading}
            onRowClick={handleRowClick as any}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </motion.div>

        {/* Modal */}
        <SubmissionDetailsModal
          submission={selectedSubmission ? { ...selectedSubmission } : undefined}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;