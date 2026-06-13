import { useTransactionsStore } from "@/store/useTransactionsStore";
import MONTH_NAMES from "@/data/monthNamesData";

export default function useSummaryBoard({
  activeTab = "expanse",
}: {
  activeTab?: "expanse" | "income";
} = {}) {
  const { transactions } = useTransactionsStore();

  const summaryData = (() => {
    const filtered = transactions.filter((t) => t.type === activeTab);
    const grouped = filtered.reduce(
      (acc, curr) => {
        const date = new Date(curr.created_at || new Date());
        const year = date.getFullYear();
        const monthIndex = date.getMonth();
        const key = `${year}-${monthIndex}`;

        if (!acc[key]) {
          acc[key] = {
            id: key,
            monthLabel: MONTH_NAMES[monthIndex],
            total: 0,
            timestamp: date.getTime(),
          };
        }

        acc[key].total += curr.amount;

        return acc;
      },
      {} as Record<
        string,
        { id: string; monthLabel: string; total: number; timestamp: number }
      >,
    );

    return Object.values(grouped)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 6);
  })();

  return {
    summaryData,
  };
}
