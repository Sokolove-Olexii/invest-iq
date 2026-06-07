"use client";

import { useTransactionsStore } from "@/store/useTransactionsStore";
import { expanseCategories } from "@/data/categoryData";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
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
}: {
  selectedDate?: Date | null;
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
          icon: cat?.icon || "/icons/GraphIcon.svg",
          total,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [transactions]);

  if (!categoryTotals.length) {
    return <div className={styles.graph_empty}>Немає даних</div>;
  }

  const maxTotal = categoryTotals[0].total;

  return (
    <div className={styles.graph}>
      <div className={styles.graph_grid}>
        {categoryTotals.map((item) => (
          <div key={item.id} className={styles.graph_card}>
            <p className={styles.graph_amount}>{formatMoney(item.total)}</p>
            <div className={styles.graph_icon}>
              <div className={styles.graph_circle}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={32}
                  height={32}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = "/icons/GraphIcon.svg")
                  }
                />
              </div>
            </div>
            <p className={styles.graph_label}>{item.label.toUpperCase()}</p>
          </div>
        ))}
      </div>

      <div className={styles.graph_progress}>
        {categoryTotals.map((item) => (
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
                height: 10,
                borderRadius: 4,
                backgroundColor: "#f5f6fb",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#fb7c2f",
                  borderRadius: 4,
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
