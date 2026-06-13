import styles from "./CategoryGraph.module.scss";
import useGraphData from "@/hooks/useOverall/useGraphData/useGraphData";
import { formatMoney } from "@/utils/formatMoney";
import { LinearProgress } from "@mui/material";
import Image from "next/image";

export default function CategoryGraph({
  type,
  selectedDate,
  renderType = "all",
}: {
  type: "income" | "expanse";
  selectedDate?: Date | null;
  renderType?: "all" | "mobile" | "grid" | "chart";
}) {
  const { categoryTotals, maxTotal } = useGraphData({ type, selectedDate });

  if (!categoryTotals.length) {
    return <div className={styles.graph_empty}>Немає даних</div>;
  }

  const gridContent = (
    <div className={styles.graph_grid}>
      {categoryTotals.map((item) => (
        <div key={item.id} className={styles.graph_card}>
          <p className={styles.graph_amount}>{formatMoney(item.total)}</p>
          <div className={styles.graph_icon}>
            <div
              className={`${styles.graph_circle} ${
                type === "income"
                  ? styles["graph_circle--income"]
                  : styles["graph_circle--expanse"]
              }`}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={item.iconWidth}
                height={item.iconHeight}
                className={
                  type === "expanse" ? styles["graph_image--expanse"] : ""
                }
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
            value={maxTotal > 0 ? (item.total / maxTotal) * 100 : 0}
            sx={{
              height: type === "income" ? 10 : 15,
              borderRadius: "0 8px 8px 0",
              backgroundColor: type === "income" ? "#f5f6fb" : "transparent",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  type === "income"
                    ? index % 3 === 0
                      ? "#407946"
                      : "#b3d5b7"
                    : index % 3 === 0
                      ? "#fb7c2f"
                      : "#fcd6bb",
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
          const isPrimary = index % 3 === 0;
          let fillClass = "";
          if (type === "income") {
            fillClass = isPrimary
              ? styles["graph_chartBarFill--incomePrimary"]
              : styles["graph_chartBarFill--incomeSecondary"];
          } else {
            fillClass = isPrimary
              ? styles["graph_chartBarFill--expansePrimary"]
              : styles["graph_chartBarFill--expanseSecondary"];
          }

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
