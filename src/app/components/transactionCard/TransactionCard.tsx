"use client";
import styles from "./TransactionCard.module.scss";
import { expanseCategories } from "@/data/categoryData";
import {
  Transaction,
  useTransactionsStore,
} from "@/store/useTransactionsStore";
import Image from "next/image";
import DeleteIcon from "../../../../public/icons/TrashIcon.svg";
import { useBalanceStore } from "@/store/useBalanceStore";

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const { balance, updateBalance } = useBalanceStore();
  const { deleteTransaction } = useTransactionsStore();

  const CategoryLabel =
    expanseCategories.find((c) => c.id === transaction.category)?.label ||
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

  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionCard__left}>
        <p className={styles.transactionCard__description}>
          {transaction.description}
        </p>
        <div className={styles.transactionCard__categoryDatePos}>
          <p className={styles.transactionCard__category}>{CategoryLabel}</p>
          <p className={styles.transactionCard__date}>{formatedData}</p>
        </div>
      </div>

      <div className={styles.transactionCard__right}>
        <span
          className={styles.transactionCard__amount}
          style={{
            color: isExpanse ? "#E7192E" : "#407946",
          }}
        >
          {isExpanse ? "-" : "+"}
          {transaction.amount} UAH
        </span>

        <button
          className={styles.transactionCard__deleteBtn}
          onClick={() => handleDelete(transaction.id)}
        >
          <Image src={DeleteIcon} alt="Видалити" width={22} height={22} />
        </button>
      </div>
    </div>
  );
}
