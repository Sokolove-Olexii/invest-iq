import { useBalanceStore } from "@/store/useBalanceStore";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { useState, useRef, useEffect } from "react";
import { incomeCategories } from "@/data/categoryData";

export default function useIncome() {
  const { balance, updateBalance } = useBalanceStore();
  const { addTransaction, isLoading } = useTransactionsStore();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const selectedCategoryLabel = incomeCategories.find(
    (c) => c.id === category,
  )?.label;

  const handleSubmit = async () => {
    if (!description || !category || !amount) return;

    const expanseAmount = parseFloat(amount);
    if (isNaN(expanseAmount) || expanseAmount <= 0) return;

    await addTransaction({
      description,
      category,
      amount: expanseAmount,
      type: "income",
      ...(date ? { created_at: date.toISOString() } : {}),
    });

    const newBalance = balance + expanseAmount;
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

  return {
    isLoading,
    isOpen,
    isTransactionModalOpen,
    setIsTransactionModalOpen,
    selectedCategoryLabel,
    handleSubmit,
    handleClear,
    description,
    setDescription,
    dropdownRef,
    category,
    setIsOpen,
    setCategory,
    amount,
    setAmount,
    date,
    setDate,
  };
}
