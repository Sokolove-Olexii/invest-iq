"use client";
import styles from "./TransactionCard.module.scss";
import { expanseCategories } from "@/data/categoryData";
import { Transaction } from "@/store/useTransactionsStore";

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const CategoryLabel =
    expanseCategories.find((c) => c.id === transaction.category)?.label ||
    transaction.category;

  const formatedData = new Date(transaction.created_at).toLocaleDateString(
    "uk-UA",
  );

  const isExpanse = transaction.type === "expanse";

  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionCard__position}>
        <p className={styles.transactionCard__title}>
          {transaction.description}
        </p>
        <p className={styles.transactionCard__date}>{formatedData}</p>
        <p className={styles.transactionCard__category}>{CategoryLabel}</p>
        <span
          style={{
            color: isExpanse ? "#E7192E" : "#407946",
          }}
        >
          {isExpanse ? "-" : "+"}
          {transaction.amount} UAH
        </span>
      </div>
    </div>
  );
}
