import { motion } from "framer-motion";
import { Eye, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
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

type ContactSubmissionsTableProps = {
  submissions: ContactSubmission[];
  isLoading: boolean;
  onRowClick: (submission: ContactSubmission) => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const eventTypeColors = {
  wedding: "bg-rose-100 text-rose-800",
  corporate: "bg-blue-100 text-blue-800", 
  private: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-800",
};

const truncateText = (text: string, maxLength: number = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const ContactSubmissionsTable = ({
  submissions,
  isLoading,
  onRowClick,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
}: ContactSubmissionsTableProps) => {
  
  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    
    // Always show first page
    if (currentPage > 3) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            onClick={() => onPageChange(1)}
            className="cursor-pointer hover:bg-gold/10"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      if (currentPage > 4) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    // Show pages around current page
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
            className="cursor-pointer hover:bg-gold/10 data-[state=active]:bg-gold data-[state=active]:text-navy"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            className="cursor-pointer hover:bg-gold/10"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  if (isLoading) {
    return (
      <Card className="bg-white rounded-2xl shadow-lg border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  {["Name", "Email", "Phone", "Event Type", "Message", "Date", "Actions"].map((header) => (
                    <TableHead key={header} className="font-semibold text-navy">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-20" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white rounded-2xl shadow-lg border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-muted/50 z-10">
                <TableRow>
                  <TableHead className="font-semibold text-navy">Name</TableHead>
                  <TableHead className="font-semibold text-navy">Email</TableHead>
                  <TableHead className="font-semibold text-navy">Phone</TableHead>
                  <TableHead className="font-semibold text-navy">Event Type</TableHead>
                  <TableHead className="font-semibold text-navy">Message</TableHead>
                  <TableHead className="font-semibold text-navy">Date</TableHead>
                  <TableHead className="font-semibold text-navy">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="text-muted-foreground">
                        <Mail className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p className="text-lg font-medium">No submissions found</p>
                        <p className="text-sm">Try adjusting your filters or search terms</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((submission, index) => (
                    <motion.tr
                      key={submission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-muted/30 cursor-pointer transition-all duration-300"
                      onClick={() => onRowClick(submission)}
                    >
                      <TableCell className="font-medium">
                        {submission.first_name} {submission.last_name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {submission.email}
                      </TableCell>
                      <TableCell>
                        {submission.phone ? (
                          <div className="flex items-center text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1" />
                            {submission.phone}
                          </div>
                        ) : (
                          <span className="text-muted-foreground/50">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={`${eventTypeColors[submission.event_type as keyof typeof eventTypeColors] || eventTypeColors.other} capitalize`}
                        >
                          {submission.event_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <span className="text-muted-foreground">
                          {truncateText(submission.message)}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(submission.created_at), "MMM dd, yyyy")}
                        <br />
                        <span className="text-xs opacity-70">
                          {format(new Date(submission.created_at), "h:mm a")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick(submission);
                          }}
                          className="border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-300"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-border p-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                      className={`cursor-pointer hover:bg-gold/10 ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                  </PaginationItem>
                  
                  {renderPaginationItems()}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                      className={`cursor-pointer hover:bg-gold/10 ${
                        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};