import { expanseCategories, incomeCategories } from "@/data/categoryData";
import {
  Transaction,
  useTransactionsStore,
} from "@/store/useTransactionsStore";
import { useBalanceStore } from "@/store/useBalanceStore";

export interface TransactionCardProps {
  transaction: Transaction;
}

export default function useTransactionCard(transaction: Transaction) {
  const { balance, updateBalance } = useBalanceStore();
  const { deleteTransaction } = useTransactionsStore();

  const CategoryLabel =
    transaction.type === "expanse"
      ? expanseCategories.find((c) => c.id === transaction.category)?.label ||
        transaction.category
      : incomeCategories.find((c) => c.id === transaction.category)?.label ||
        transaction.category;

  const formatedData = new Date(transaction.created_at).toLocaleDateString(
    "uk-UA",
  );

  const isExpanse = transaction.type === "expanse";

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);

    const newBalance = isExpanse
      ? balance + transaction.amount
      : balance - transaction.amount;

    await updateBalance(newBalance);
  };

  return { CategoryLabel, formatedData, isExpanse, handleDelete };
}
