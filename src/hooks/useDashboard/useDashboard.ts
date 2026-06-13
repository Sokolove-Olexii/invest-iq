import { useTransactionsStore } from "@/store/useTransactionsStore";
import { useState, useEffect, useRef } from "react";
import { useBalanceStore } from "@/store/useBalanceStore";

export default function useDashboard() {
  const { balance, isLoading, fetchBalance, updateBalance } = useBalanceStore();
  const { fetchTransactions } = useTransactionsStore();
  const [localValue, setLocalValue] = useState<string | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const hasCheckedBalance = useRef(false);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, [fetchBalance, fetchTransactions]);

  useEffect(() => {
    if (!isLoading && !hasCheckedBalance.current) {
      const hasSeenFaq = localStorage.getItem("hasSeenBalanceFaq");
      if (balance === 0 && !hasSeenFaq) {
        setTimeout(() => setIsFaqOpen(true), 0);
      }
      hasCheckedBalance.current = true;
    }
  }, [balance, isLoading]);

  const displayValue = localValue !== null ? localValue : balance.toString();

  const handleSave = () => {
    const numericValue = parseFloat(displayValue);
    if (!isNaN(numericValue)) {
      updateBalance(numericValue);
      setLocalValue(null);
      setIsFaqOpen(false);
      localStorage.setItem("hasSeenBalanceFaq", "true");
    }
  };

  const handleCloseFaq = () => {
    setIsFaqOpen(false);
    localStorage.setItem("hasSeenBalanceFaq", "true");
  };

  return {
    isLoading,
    displayValue,
    isFaqOpen,
    setLocalValue,
    handleSave,
    handleCloseFaq,
  };
}
