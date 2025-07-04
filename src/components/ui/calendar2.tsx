import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar2({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-0 w-full", className)}
      classNames={{
        months: "flex flex-col space-y-2 mt-3",
        month: "space-y-3",
        caption: "relative flex justify-center items-center py-3",
        caption_label: "text-sm font-medium text-center",
        nav: "absolute top-1 left-0 right-0 flex justify-between",
        nav_button: cn("p-2 rounded-full hover:bg-gray-200 transition-all"),
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7 font-bold",
        head_cell: "text-md font-normal text-center text-foreground mb-2",
        row: "grid grid-cols-7",
        cell: "text-center relative p-0 text-md",
        day: cn(
          "inline-flex items-center justify-center rounded-full h-8 w-8 text-sm font-normal hover:bg-gray-200 hover:text-black"
        ),
        day_selected: cn(
          "bg-[#1877F2] text-white font-semibold hover:bg-blue-600",
          "data-[today]:border-none" // ✅ Removes border when today is selected
        ),
        day_today: "font-semibold text-foreground border border-1.5",
        day_outside: "text-gray-400",
        day_disabled: "text-gray-300 opacity-50",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-5 w-5 text-gray-500" />,
        IconRight: () => <ChevronRight className="h-5 w-5 text-gray-500" />,
      }}
      {...props}
    />
  );
}

export { Calendar2 };