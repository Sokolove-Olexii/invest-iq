"use client";

import styles from "./overall.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { useEffect, useState } from "react";
import OverallSection from "@/app/components/overall/OverallSection";
import BackIcon from "../../../../public/icons/BackIcon.svg";
import LeftArrow from "../../../../public/icons/LeftArrow.svg";
import RightArrow from "../../../../public/icons/RightArrow.svg";

const formatMoney = (amount: number | string) => {
  const num = Number(amount) || 0;
  return num
    .toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(",", ".");
};

export default function Overall() {
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

  return (
    <section className={styles.overall}>
      <div className={styles.topHeader}>
        <div className={styles.topNav}>
          <Link href="/dashboard" className={styles.backButton}>
            <Image
              src={BackIcon}
              alt="Back"
              width={24}
              height={24}
              className={styles.backButton__icon}
            />
            <p className={styles.backButton__text}>Повернутись на головну</p>
          </Link>
        </div>

        <div className={styles.balanceWrapper}>
          <p className={styles.label}>Баланс:</p>
          <div className={styles.balancePill}>{formatMoney(balance)} UAH</div>
        </div>

        <div className={styles.periodWrapper}>
          <div className={styles.periodContainer}>
            <p className={styles.label}>Поточний період</p>
            <div className={styles.periodSelector}>
              <button className={styles.arrowButton} onClick={handlePrevMonth}>
                <Image src={LeftArrow} alt="Prev" width={7} height={12} />
              </button>
              <h2 className={styles.periodText}>
                {date
                  ? [
                      "СІЧЕНЬ",
                      "ЛЮТИЙ",
                      "БЕРЕЗЕНЬ",
                      "КВІТЕНЬ",
                      "ТРАВЕНЬ",
                      "ЧЕРВЕНЬ",
                      "ЛИПЕНЬ",
                      "СЕРПЕНЬ",
                      "ВЕРЕСЕНЬ",
                      "ЖОВТЕНЬ",
                      "ЛИСТОПАД",
                      "ГРУДЕНЬ",
                    ][date.getMonth()]
                  : ""}
                <br />
                <span>{date ? date.getFullYear() : ""}</span>
              </h2>
              <button className={styles.arrowButton} onClick={handleNextMonth}>
                <Image src={RightArrow} alt="Next" width={7} height={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryCol}>
          <p className={styles.summaryLabel}>Витрати:</p>
          <p className={styles.expanseValue}>
            - {formatMoney(totalExpanse)} грн.
          </p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.summaryCol}>
          <p className={styles.summaryLabel}>Доходи:</p>
          <p className={styles.incomeValue}>
            + {formatMoney(totalIncome)} грн.
          </p>
        </div>
      </div>

      <OverallSection selectedDate={date} />
    </section>
  );
}
