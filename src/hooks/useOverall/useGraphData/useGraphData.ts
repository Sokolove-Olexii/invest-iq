import { useMemo } from "react";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { incomeCategories, expanseCategories } from "@/data/categoryData";
import GraphIcon from "../../../../public/icons/GraphIcon.svg";

export default function useGraphData({
  type,
  selectedDate,
}: {
  type: "income" | "expanse";
  selectedDate?: Date | null;
}) {
  const transactions = useTransactionsStore((state) => state.transactions);

  const categoryTotals = useMemo(() => {
    const totals = transactions
      .filter((t) => {
        if (t.type !== type) return false;
        if (!selectedDate || !t.created_at) return true;
        const tDate = new Date(t.created_at);
        return (
          tDate.getMonth() === selectedDate.getMonth() &&
          tDate.getFullYear() === selectedDate.getFullYear()
        );
      })
      .reduce(
        (acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount;
          return acc;
        },
        {} as Record<string, number>,
      );

    const categories = type === "income" ? incomeCategories : expanseCategories;

    return Object.entries(totals)
      .map(([id, total]) => {
        const cat = categories.find((c) => c.id === id);
        return {
          id,
          label: cat?.label || id,
          icon: cat?.icon || GraphIcon,
          iconWidth: cat?.width || 50,
          iconHeight: cat?.height || 50,
          total,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [transactions, selectedDate, type]);

  const maxTotal = categoryTotals.length > 0 ? categoryTotals[0].total : 0;

  return {
    categoryTotals,
    maxTotal,
  };
}
