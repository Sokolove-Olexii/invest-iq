"use client";

import { useTransactionsStore } from "@/store/useTransactionsStore";
import { expanseCategories } from "@/data/categoryData";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
import GraphIcon from "../../../../public/icons/GraphIcon.svg";
import styles from "./ExpanseGraph.module.scss";
import { useMemo } from "react";

const formatMoney = (amount: number) => {
  return amount
    .toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(",", ".");
};

export default function ExpanseGraph({
  selectedDate,
  renderType = "all",
}: {
  selectedDate?: Date | null;
  renderType?: "all" | "mobile" | "grid" | "chart";
}) {
  const transactions = useTransactionsStore((state) => state.transactions);

  const categoryTotals = useMemo(() => {
    const totals = transactions
      .filter((t) => {
        if (t.type !== "expanse") return false;
        if (!selectedDate || !t.created_at) return true;
        const tDate = new Date(t.created_at);
        return (
          tDate.getMonth() === selectedDate.getMonth() &&
          tDate.getFullYear() === selectedDate.getFullYear()
        );
      })
      .reduce(
        (acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount;
          return acc;
        },
        {} as Record<string, number>,
      );

    return Object.entries(totals)
      .map(([id, total]) => {
        const cat = expanseCategories.find((c) => c.id === id);
        return {
          id,
          label: cat?.label || id,
          icon: cat?.icon || GraphIcon,
          iconWidth: cat?.width || 50,
          iconHeight: cat?.height || 50,
          total,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [transactions]);

  if (!categoryTotals.length) {
    return <div className={styles.graph_empty}>Немає даних</div>;
  }

  const maxTotal = categoryTotals[0].total;

  const gridContent = (
    <div className={styles.graph_grid}>
      {categoryTotals.map((item) => (
        <div key={item.id} className={styles.graph_card}>
          <p className={styles.graph_amount}>{formatMoney(item.total)}</p>
          <div className={styles.graph_icon}>
            <div className={styles.graph_circle}>
              <Image
                className={styles.graph_image}
                src={item.icon}
                alt={item.label}
                width={item.iconWidth}
                height={item.iconHeight}
              />
            </div>
          </div>
          <p className={styles.graph_label}>{item.label.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );

  const progressContent = (
    <div className={styles.graph_progress}>
      {categoryTotals.map((item, index) => (
        <div key={`progress-${item.id}`} className={styles.graph_row}>
          <div className={styles.graph_header}>
            <span className={styles.graph_progressLabel}>{item.label}</span>
            <span className={styles.graph_progressAmount}>
              {item.total} грн
            </span>
          </div>
          <LinearProgress
            variant="determinate"
            value={(item.total / maxTotal) * 100}
            sx={{
              height: 15,
              borderRadius: "0 8px 8px 0",
              backgroundColor: "transparent",
              "& .MuiLinearProgress-bar": {
                backgroundColor: index % 3 === 0 ? "#fb7c2f" : "#fcd6bb",
                borderRadius: "0 8px 8px 0",
              },
            }}
          />
        </div>
      ))}
    </div>
  );

  const chartContent = (
    <div className={styles.graph_chart}>
      <div className={styles.graph_chartGrid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.graph_chartGridLine} />
        ))}
      </div>
      <div className={styles.graph_chartBars}>
        {categoryTotals.map((item, index) => {
          const isOrange = index % 3 === 0;
          const fillClass = isOrange
            ? styles["graph_chartBarFill--orange"]
            : styles["graph_chartBarFill--peach"];

          const heightPercent =
            maxTotal > 0 ? (item.total / maxTotal) * 100 : 0;

          return (
            <div
              key={`chart-${item.id}`}
              className={styles.graph_chartBarWrapper}
            >
              <span className={styles.graph_chartBarAmount}>
                {item.total} грн
              </span>
              <div
                className={`${styles.graph_chartBarFill} ${fillClass}`}
                style={{ height: `${heightPercent}%` }}
              />
              <span className={styles.graph_chartBarLabel}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (renderType === "grid") return gridContent;
  if (renderType === "chart") return chartContent;
  if (renderType === "mobile") {
    return (
      <div className={styles.graph}>
        {gridContent}
        {progressContent}
      </div>
    );
  }

  return (
    <div className={styles.graph}>
      <div className={styles.graph_grid_container}>{gridContent}</div>
      {progressContent}
      <div className={styles.graph_chart_container}>{chartContent}</div>
    </div>
  );
}
