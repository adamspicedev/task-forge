"use client";

import { format } from "date-fns";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DateAction } from "../types";

interface CustomToolbarProps {
  date: Date;
  onNavigate: (date: DateAction) => void;
}

export function CustomToolbar({ date, onNavigate }: CustomToolbarProps) {
  return (
    <div className="lf:w-auto mb-4 flex w-full items-center justify-center gap-x-2 lg:justify-start">
      <Button
        size="icon"
        variant="secondary"
        onClick={() => onNavigate("PREV")}
        className="flex items-center"
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
      <div className="flex h-8 w-full items-center justify-center rounded-md border border-input px-3 py-2 lg:w-auto">
        <CalendarIcon className="mr-2 size-4" />
        {format(date, "MMMM yyyy")}
      </div>
      <Button
        size="icon"
        variant="secondary"
        onClick={() => onNavigate("NEXT")}
        className="flex items-center"
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
}
