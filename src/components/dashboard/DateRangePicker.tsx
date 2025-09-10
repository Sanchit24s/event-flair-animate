import { useState } from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DateRangePickerProps = {
  dateRange: { from?: Date; to?: Date };
  setDateRange: (range: { from?: Date; to?: Date }) => void;
};

export const DateRangePicker = ({
  dateRange,
  setDateRange,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const clearDateRange = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateRange({});
  };

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`;
    }
    if (dateRange.from) {
      return `From ${format(dateRange.from, "MMM dd")}`;
    }
    if (dateRange.to) {
      return `Until ${format(dateRange.to, "MMM dd")}`;
    }
    return "Select date range";
  };

  const hasDateRange = dateRange.from || dateRange.to;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal border-2 border-border focus:border-gold rounded-xl h-11",
            !hasDateRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="flex-1">{formatDateRange()}</span>
          {hasDateRange && (
            <X
              className="ml-2 h-4 w-4 hover:bg-muted rounded"
              onClick={clearDateRange}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange.from}
          selected={{
            from: dateRange.from,
            to: dateRange.to,
          }}
          onSelect={(range) => {
            setDateRange({
              from: range?.from,
              to: range?.to,
            });
            if (range?.from && range?.to) {
              setIsOpen(false);
            }
          }}
          numberOfMonths={2}
          className="pointer-events-auto"
        />
        <div className="p-3 border-t border-border">
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDateRange({});
                setIsOpen(false);
              }}
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => setIsOpen(false)}
              className="flex-1 gold-gradient text-navy"
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};