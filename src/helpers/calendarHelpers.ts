import { CalendarCell } from "@/data/calendarData";

export function getDaysGrid(
  year: number,
  month: number,
  selectedDate: Date | null,
): CalendarCell[] {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();

  const cells: CalendarCell[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      currentMonth: false,
      isSelected: false,
      isToday: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isSelected =
      !!selectedDate &&
      selectedDate.getDate() === i &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;

    const isToday =
      today.getDate() === i &&
      today.getMonth() === month &&
      today.getFullYear() === year;

    cells.push({ day: i, currentMonth: true, isSelected, isToday });
  }

  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({
      day: i,
      currentMonth: false,
      isSelected: false,
      isToday: false,
    });
  }

  return cells;
}

export function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
}
