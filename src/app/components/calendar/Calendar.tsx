import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import styles from "./Calendar.module.scss";
import CalendarIcon from "../../../../public/icons/CalendarIcon.svg";
import useCalendar, { CalendarProps } from "@/hooks/useCalendar/useCalendar";

export default function Calendar({ selectedDate, onChange }: CalendarProps) {
  const { date, handleChange } = useCalendar({ selectedDate, onChange });

  return (
    <div className={styles.calendarWrapper}>
      <Image src={CalendarIcon} alt="Calendar" width={20} height={20} />
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
