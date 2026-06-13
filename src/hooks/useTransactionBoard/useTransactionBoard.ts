import { useState, useRef, useEffect } from "react";
import { expanseCategories, incomeCategories } from "@/data/categoryData";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { useBalanceStore } from "@/store/useBalanceStore";

export default function useTransactionBoard() {
  const [activeTab, setActiveTab] = useState<"expanse" | "income">("expanse");
  const { balance, updateBalance } = useBalanceStore();
  const { transactions, addTransaction, isLoading } = useTransactionsStore();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCategories =
    activeTab === "income" ? incomeCategories : expanseCategories;

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategoryLabel = currentCategories.find(
    (c) => c.id === category,
  )?.label;

  const handleSubmit = async () => {
    if (!description || !category || !amount) return;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    await addTransaction({
      description,
      category,
      amount: parsedAmount,
      type: activeTab,
      ...(date ? { created_at: date.toISOString() } : {}),
    });

    const newBalance =
      activeTab === "income" ? balance + parsedAmount : balance - parsedAmount;
    await updateBalance(newBalance);

    setDescription("");
    setCategory("");
    setAmount("");
    setDate(new Date());
  };

  const handleClear = () => {
    setDescription("");
    setCategory("");
    setAmount("");
    setDate(new Date());
  };

  const filteredTransactions = transactions.filter((t) => t.type === activeTab);

  return {
    activeTab,
    setActiveTab,
    setCategory,
    date,
    setDate,
    description,
    setDescription,
    dropdownRef,
    setIsOpen,
    category,
    selectedCategoryLabel,
    currentCategories,
    amount,
    setAmount,
    handleSubmit,
    setIsTransactionModalOpen,
    transactions,
    filteredTransactions,
    isTransactionModalOpen,
    handleClear,
    isOpen,
    isLoading,
  };
}
