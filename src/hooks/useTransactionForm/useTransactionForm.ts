import { useBalanceStore } from "@/store/useBalanceStore";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { useState, useRef, useEffect } from "react";
import { incomeCategories, expanseCategories } from "@/data/categoryData";
import { toast } from "react-toastify";

export default function useTransactionForm(type: "income" | "expanse") {
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

  const categories = type === "income" ? incomeCategories : expanseCategories;
  const selectedCategoryLabel = categories.find((c) => c.id === category)?.label;

  const handleSubmit = async () => {
    if (!description || !category || !amount) {
      toast.warning("Будь ласка, заповніть всі пункти (опис, категорію та суму).");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.warning("Сума повинна бути більшою за нуль.");
      return;
    }

    await addTransaction({
      description,
      category,
      amount: numericAmount,
      type,
      ...(date ? { created_at: date.toISOString() } : {}),
    });

    const newBalance =
      type === "income" ? balance + numericAmount : balance - numericAmount;
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
    categories,
    date,
    setDate,
    description,
    setDescription,
    dropdownRef,
    setIsOpen,
    isOpen,
    category,
    setCategory,
    selectedCategoryLabel,
    amount,
    setAmount,
    handleSubmit,
    handleClear,
    isLoading,
    setIsTransactionModalOpen,
    isTransactionModalOpen,
  };
}
