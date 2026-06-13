"use client";

import styles from "./Calendar.module.scss";
import { createPortal } from "react-dom";
import useCalendar, { CalendarProps } from "@/hooks/useCalendar/useCalendar";
import { CalendarIcon } from "@/assets/icons";
import { DAY_NAMES, MONTH_NAMES_SHORT } from "@/data/calendarData";
import Image from "next/image";

export default function Calendar({ selectedDate, onChange }: CalendarProps) {
  const {
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
  } = useCalendar({ selectedDate, onChange });

  return (
    <>
      <div className={styles.trigger} onClick={toggleOpen} ref={triggerRef}>
        <Image src={CalendarIcon} alt="Calendar" width={20} height={20} />
        <span className={styles.trigger__date}>{formattedDate}</span>
      </div>

      {isOpen &&
        createPortal(
          <div
            className={styles.dropdown}
            ref={dropdownRef}
            style={{
              top: dropdownPos.top,
              left: dropdownPos.left,
              transform: dropdownPos.isCentered ? "translateX(-50%)" : "none",
            }}
          >
            <div className={styles.dropdown__header}>
              <button
                className={styles.dropdown__arrow}
                onClick={goToPrevMonth}
              >
                ‹
              </button>
              <span className={styles.dropdown__title}>
                {MONTH_NAMES_SHORT[viewMonth]} {viewYear}
              </span>
              <button
                className={styles.dropdown__arrow}
                onClick={goToNextMonth}
              >
                ›
              </button>
            </div>

            <div className={styles.dropdown__dayNames}>
              {DAY_NAMES.map((d) => (
                <span key={d} className={styles.dropdown__dayName}>
                  {d}
                </span>
              ))}
            </div>

            <div className={styles.dropdown__grid}>
              {cells.map((cell, i) => (
                <button
                  key={i}
                  className={`${styles.dropdown__cell} ${
                    !cell.currentMonth ? styles["dropdown__cell--outside"] : ""
                  } ${
                    cell.isSelected ? styles["dropdown__cell--selected"] : ""
                  } ${
                    cell.isToday && !cell.isSelected
                      ? styles["dropdown__cell--today"]
                      : ""
                  }`}
                  onClick={() => cell.currentMonth && handleDayClick(cell.day)}
                  disabled={!cell.currentMonth}
                >
                  {cell.day}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
