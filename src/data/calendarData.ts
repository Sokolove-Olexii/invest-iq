export const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export const MONTH_NAMES_SHORT = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export interface CalendarCell {
  day: number;
  currentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
}
