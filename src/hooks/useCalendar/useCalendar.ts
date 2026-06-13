import { useState } from "react";

export interface CalendarProps {
  selectedDate?: Date | null;
  onChange?: (date: Date | null) => void;
}

export default function useCalendar({
  selectedDate: externalDate,
  onChange,
}: CalendarProps) {
  const [internalDate, setInternalDate] = useState<Date | null>(new Date());

  const date = externalDate !== undefined ? externalDate : internalDate;

  const handleChange = (newDate: Date | null) => {
    if (externalDate === undefined) {
      setInternalDate(newDate);
    }
    if (onChange) {
      onChange(newDate);
    }
  };

  return {
    date,
    handleChange,
  };
}
