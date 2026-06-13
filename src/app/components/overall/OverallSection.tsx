"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./OverallSection.module.scss";
import CategoryGraph from "./CategoryGraph";
import LeftArrow from "../../../../public/icons/LeftArrow.svg";
import RightArrow from "../../../../public/icons/RightArrow.svg";
import useOverallSection from "@/hooks/useOverall/useOverallSection/useOverallSection";

export default function OverallSection({
  selectedDate,
}: {
  selectedDate: Date | null;
}) {
  const { direction, slideVariants, activeTab, setActiveTab } =
    useOverallSection({ selectedDate });
  const renderAnimatedGraph = (
    renderType: "mobile" | "grid" | "chart",
    id: string,
  ) => (
    <AnimatePresence mode="popLayout" custom={direction}>
      <motion.div
        key={`${id}-${activeTab}`}
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
        <CategoryGraph
          type={activeTab}
          selectedDate={selectedDate}
          renderType={renderType}
        />
      </motion.div>
    </AnimatePresence>
  );

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
          {renderAnimatedGraph("mobile", "mobile")}
        </motion.div>

        <motion.div layout className={styles.section_tablet_layout}>
          <motion.div layout className={styles.section_tablet_grid_container}>
            {renderAnimatedGraph("grid", "grid")}
          </motion.div>

          <motion.div layout className={styles.section_tablet_chart_container}>
            {renderAnimatedGraph("chart", "chart")}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
