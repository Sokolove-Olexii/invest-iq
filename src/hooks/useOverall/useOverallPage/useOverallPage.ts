import { useBalanceStore } from "@/store/useBalanceStore";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { useEffect, useState } from "react";
import { formatMoney } from "@/utils/formatMoney";

export default function useOverallSection() {
  const { balance, fetchBalance } = useBalanceStore();
  const { fetchTransactions } = useTransactionsStore();

  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, [fetchBalance, fetchTransactions]);

  const handlePrevMonth = () => {
    setDate((prev) => {
      if (!prev) return new Date();
      return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
    });
    fetchTransactions();
  };

  const handleNextMonth = () => {
    setDate((prev) => {
      if (!prev) return new Date();
      return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
    });
    fetchTransactions();
  };

  const transactions = useTransactionsStore((state) => state.transactions);

  const filteredTransactions = transactions.filter((t) => {
    if (!date || !t.created_at) return true;
    const tDate = new Date(t.created_at);
    return (
      tDate.getMonth() === date.getMonth() &&
      tDate.getFullYear() === date.getFullYear()
    );
  });

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpanse = filteredTransactions
    .filter((t) => t.type === "expanse")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    balance,
    date,
    totalIncome,
    totalExpanse,
    handlePrevMonth,
    handleNextMonth,
    formatMoney,
  };
}
