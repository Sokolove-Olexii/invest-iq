"use client";

import styles from "./summaryBoard.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import useSummaryBoard from "@/hooks/useSummaryBoard/useSummaryBord";

export default function SummaryBoard({ activeTab }: { activeTab?: "expanse" | "income" }) {
  const { summaryData } = useSummaryBoard({ activeTab });

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
                initial={{
                  opacity: 0,
                  height: 0,
                  paddingBottom: 0,
                  paddingTop: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  paddingBottom: 16,
                  paddingTop: 16,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  paddingBottom: 0,
                  paddingTop: 0,
                }}
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
              initial={{
                opacity: 0,
                height: 0,
                paddingBottom: 0,
                paddingTop: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                paddingBottom: 16,
                paddingTop: 16,
              }}
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
