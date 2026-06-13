import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { getDaysGrid, formatDate } from "@/helpers/calendarHelpers";

export interface CalendarProps {
  selectedDate?: Date | null;
  onChange?: (date: Date | null) => void;
}

export default function useCalendar({
  selectedDate: externalDate,
  onChange,
}: CalendarProps) {
  const [internalDate, setInternalDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, isCentered: false });

  const date = externalDate !== undefined ? externalDate : internalDate;

  const [viewYear, setViewYear] = useState(() =>
    (date ?? new Date()).getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(() =>
    (date ?? new Date()).getMonth(),
  );

  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formattedDate = date ? formatDate(date) : "Оберіть дату";

  const cells = useMemo(
    () => getDaysGrid(viewYear, viewMonth, date),
    [viewYear, viewMonth, date],
  );

  const handleChange = useCallback(
    (newDate: Date | null) => {
      if (externalDate === undefined) {
        setInternalDate(newDate);
      }
      onChange?.(newDate);
      if (newDate) {
        setViewYear(newDate.getFullYear());
        setViewMonth(newDate.getMonth());
      }
    },
    [externalDate, onChange],
  );

  const handleDayClick = useCallback(
    (day: number) => {
      handleChange(new Date(viewYear, viewMonth, day));
      setIsOpen(false);
    },
    [handleChange, viewYear, viewMonth],
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const goToPrevMonth = useCallback(() => {
    setViewMonth((prev) => {
      if (prev === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewMonth((prev) => {
      if (prev === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth <= 768;
      
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: isMobile ? rect.left + window.scrollX + rect.width / 2 : rect.left + window.scrollX,
        isCentered: isMobile,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return {
    formattedDate,
    isOpen,
    toggleOpen,
    viewYear,
    viewMonth,
    goToPrevMonth,
    goToNextMonth,
    cells,
    handleDayClick,
    triggerRef,
    dropdownRef,
    dropdownPos,
  };
}
