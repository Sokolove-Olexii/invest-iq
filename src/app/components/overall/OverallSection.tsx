"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./OverallSection.module.scss";
import ExpanseGraph from "./ExpanseGraph";
import IncomeGraph from "./IncomeGraph";
import LeftArrow from "../../../../public/icons/LeftArrow.svg";
import RightArrow from "../../../../public/icons/RightArrow.svg";

export default function OverallSection({
  selectedDate,
}: {
  selectedDate: Date | null;
}) {
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
    <motion.div layout className={styles.section}>
      <motion.div layout className={styles.section_header}>
        <button
          onClick={() => setActiveTab("expanse")}
          className={`${styles.section_arrow} ${
            activeTab === "expanse" ? styles["section_arrow--disabled"] : ""
          }`}
          disabled={activeTab === "expanse"}
        >
          <Image src={LeftArrow} alt="Previous" width={7} height={12} />
        </button>

        <AnimatePresence mode="popLayout">
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
          <Image src={RightArrow} alt="Next" width={7} height={12} />
        </button>
      </motion.div>

      <motion.div layout className={styles.section_content}>
        <motion.div layout className={styles.section_mobile_layout}>
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={`mobile-${activeTab}`}
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
                <ExpanseGraph selectedDate={selectedDate} renderType="mobile" />
              ) : (
                <IncomeGraph selectedDate={selectedDate} renderType="mobile" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div layout className={styles.section_tablet_layout}>
          <motion.div layout className={styles.section_tablet_grid_container}>
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`grid-${activeTab}`}
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
                  <ExpanseGraph selectedDate={selectedDate} renderType="grid" />
                ) : (
                  <IncomeGraph selectedDate={selectedDate} renderType="grid" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div layout className={styles.section_tablet_chart_container}>
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`chart-${activeTab}`}
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
                  <ExpanseGraph
                    selectedDate={selectedDate}
                    renderType="chart"
                  />
                ) : (
                  <IncomeGraph selectedDate={selectedDate} renderType="chart" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
