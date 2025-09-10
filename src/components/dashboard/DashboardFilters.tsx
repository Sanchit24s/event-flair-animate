import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DashboardFiltersProps = {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
    eventTypeFilter: string;
    setEventTypeFilter: (v: string) => void;
    statusFilter?: "all" | "pending" | "contacted";
    setStatusFilter?: (v: "all" | "pending" | "contacted") => void;
    dateRange: { from?: Date; to?: Date; };
    setDateRange: (range: { from?: Date; to?: Date; }) => void;
    sortOrder: "newest" | "oldest";
    setSortOrder: (v: "newest" | "oldest") => void;
    pageSize: number;
    setPageSize: (v: number) => void;
};

export const DashboardFilters = ({
    searchTerm,
    setSearchTerm,
    eventTypeFilter,
    setEventTypeFilter,
    statusFilter = "all",
    setStatusFilter,
    dateRange,
    setDateRange,
    sortOrder,
    setSortOrder,
    pageSize,
    setPageSize,
}: DashboardFiltersProps) => {
    return (
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
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search by name, email, phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 border-2 border-border focus:border-gold rounded-xl h-11"
                            />
                        </div>

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

                        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />

                        <Select value={statusFilter} onValueChange={(v: "all" | "pending" | "contacted") => setStatusFilter && setStatusFilter(v)}>
                            <SelectTrigger className="border-2 border-border focus:border-gold rounded-xl h-11">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortOrder} onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}>
                            <SelectTrigger className="border-2 border-border focus:border-gold rounded-xl h-11">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                            </SelectContent>
                        </Select>

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
                </CardContent>
            </Card>
        </motion.div>
    );
};


