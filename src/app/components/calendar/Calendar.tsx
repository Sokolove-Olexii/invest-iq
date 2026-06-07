import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import styles from "./Calendar.module.scss";

interface CalendarProps {
  selectedDate?: Date | null;
  onChange?: (date: Date | null) => void;
}

export default function Calendar({
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

  return (
    <div className={styles.calendarWrapper}>
      <Image
        src="/icons/CalendarIcon.svg"
        alt="Calendar"
        width={20}
        height={20}
      />
      <DatePicker
        selected={date}
        onChange={handleChange}
        dateFormat="dd.MM.yyyy"
        className={styles.customDateInput}
        calendarClassName={styles.customCalendar}
      />
    </div>
  );
}
