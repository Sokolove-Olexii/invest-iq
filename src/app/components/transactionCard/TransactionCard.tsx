"use client";

import styles from "./TransactionCard.module.scss";
import { TrashIcon as DeleteIcon } from "@/assets/icons";
import useTransactionCard, {
  TransactionCardProps,
} from "@/hooks/useTransactionCard/useTransactionCard";
import Image from "next/image";

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const { CategoryLabel, formatedData, isExpanse, handleDelete } =
    useTransactionCard(transaction);

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
