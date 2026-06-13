"use client";

import styles from "./overall.module.scss";
import useOverallSection from "../../../hooks/useOverall/useOverallPage/useOverallPage";
import OverallSection from "@/app/components/overall/OverallSection";
import { BackIcon, LeftArrow, RightArrow } from "@/assets/icons";
import LogoScroll from "@/app/components/ui/LogoScroll/LogoScroll";
import Image from "next/image";
import Link from "next/link";
import MONTH_NAMES from "@/data/monthNamesData";

export default function Overall() {
  const {
    formatMoney,
    handleNextMonth,
    handlePrevMonth,
    date,
    totalExpanse,
    totalIncome,
    balance,
  } = useOverallSection();

  return (
    <section className={styles.overall}>
      <div className={styles.logoScrollContainer}>
        <LogoScroll />
      </div>

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
                {date ? MONTH_NAMES[date.getMonth()] : ""}
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
