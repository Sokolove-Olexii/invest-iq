"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./OverallSection.module.scss";
import ExpanseGraph from "./ExpanseGraph";
import IncomeGraph from "./IncomeGraph";

export default function OverallSection({ selectedDate }: { selectedDate: Date | null }) {
  const [activeTab, setActiveTab] = useState<"expanse" | "income">("expanse");

  const direction = activeTab === "income" ? 1 : -1;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <button
          onClick={() => setActiveTab("expanse")}
          className={`${styles.section_arrow} ${
            activeTab === "expanse" ? styles["section_arrow--disabled"] : ""
          }`}
          disabled={activeTab === "expanse"}
        >
          <Image
            src="/icons/LeftArrow.svg"
            alt="Previous"
            width={7}
            height={12}
          />
        </button>

        <AnimatePresence mode="wait">
          <motion.h3
            key={activeTab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={styles.section_title}
          >
            {activeTab === "expanse" ? "ВИТРАТИ" : "ДОХОДИ"}
          </motion.h3>
        </AnimatePresence>

        <button
          onClick={() => setActiveTab("income")}
          className={`${styles.section_arrow} ${
            activeTab === "income" ? styles["section_arrow--disabled"] : ""
          }`}
          disabled={activeTab === "income"}
        >
          <Image src="/icons/RightArrow.svg" alt="Next" width={7} height={12} />
        </button>
      </div>

      <div
        className={styles.section_content}
        style={{ position: "relative", overflow: "hidden", minHeight: "300px" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {activeTab === "expanse" ? (
          <ExpanseGraph selectedDate={selectedDate} />
        ) : (
          <IncomeGraph selectedDate={selectedDate} />
        )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
