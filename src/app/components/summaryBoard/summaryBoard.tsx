"use client";

import styles from "./summaryBoard.module.scss";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { motion, AnimatePresence } from "framer-motion";

const MONTH_NAMES = [
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
];

export default function SummaryBoard({
  activeTab = "expanse",
}: {
  activeTab?: "expanse" | "income";
}) {
  const { transactions } = useTransactionsStore();

  const summaryData = (() => {
    const filtered = transactions.filter((t) => t.type === activeTab);
    const grouped = filtered.reduce(
      (acc, curr) => {
        const date = new Date(curr.created_at || new Date());
        const year = date.getFullYear();
        const monthIndex = date.getMonth();
        const key = `${year}-${monthIndex}`;

        if (!acc[key]) {
          acc[key] = {
            id: key,
            monthLabel: MONTH_NAMES[monthIndex],
            total: 0,
            timestamp: date.getTime(),
          };
        }

        acc[key].total += curr.amount;

        return acc;
      },
      {} as Record<
        string,
        { id: string; monthLabel: string; total: number; timestamp: number }
      >,
    );

    return Object.values(grouped)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 6);
  })();

  return (
    <div className={styles.summaryBoard}>
      <div className={styles.summaryBoard__header}>ЗВЕДЕННЯ</div>
      <ul className={styles.summaryBoard__list}>
        <AnimatePresence initial={false}>
          {summaryData.length > 0 ? (
            summaryData.map((item) => (
              <motion.li
                key={item.id}
                className={styles.summaryBoard__item}
                initial={{ opacity: 0, height: 0, paddingBottom: 0, paddingTop: 0 }}
                animate={{ opacity: 1, height: "auto", paddingBottom: 16, paddingTop: 16 }}
                exit={{ opacity: 0, height: 0, paddingBottom: 0, paddingTop: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <span className={styles.summaryBoard__month}>
                  {item.monthLabel}
                </span>
                <span className={styles.summaryBoard__amount}>
                  {item.total.toFixed(2)}
                </span>
              </motion.li>
            ))
          ) : (
            <motion.li
              key="empty"
              className={styles.summaryBoard__item}
              initial={{ opacity: 0, height: 0, paddingBottom: 0, paddingTop: 0 }}
              animate={{ opacity: 1, height: "auto", paddingBottom: 16, paddingTop: 16 }}
              exit={{ opacity: 0, height: 0, paddingBottom: 0, paddingTop: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <span className={styles.summaryBoard__month}>НЕМАЄ ДАНИХ</span>
              <span className={styles.summaryBoard__amount}>0.00</span>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}
