"use client";

import styles from "./dashboard.module.scss";
import { ThreeDots } from "react-loader-spinner";
import useDashboard from "../../hooks/useDashboard/useDashboard";
import Link from "next/link";
import Image from "next/image";
import Calendar from "@/app/components/calendar/Calendar";
import GraphIcon from "../../../public/icons/GraphIcon.svg";
import TransactionBoard from "@/app/components/transactionBoard/TransactionBoard";
import SummaryBoard from "../components/summaryBoard/summaryBoard";
import FaqModal from "../components/modals/faqModal/faqModal";

export default function DashboardPage() {
  const {
    isLoading,
    displayValue,
    isFaqOpen,
    setLocalValue,
    handleCloseFaq,
    handleSave,
  } = useDashboard();

  return (
    <section className={styles.dashboard}>
      <div className={styles.dashboard__topSection}>
        <Link
          href="/dashboard/overall"
          className={styles.dashboard__linkToCalculations}
        >
          <p>Перейти до розрахунків</p>
          <Image src={GraphIcon} alt="GraphIcon" width={24} height={24} />
        </Link>

        <div className={styles.dashboard__balanceWrapper}>
          <p className={styles.dashboard__balanceLabel}>Баланс:</p>
          <div className={styles.dashboard__balanceInteractiveArea}>
            <div className={styles.dashboard__balanceContainer}>
              <div className={styles.dashboard__inputWrapper}>
                <input
                  type="text"
                  inputMode="numeric"
                  className={styles.dashboard__balanceInput}
                  placeholder="00.00"
                  value={displayValue}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.]/g, "");
                    setLocalValue(val);
                  }}
                />
                <span className={styles.dashboard__currencySuffix}>UAH</span>
              </div>
              <div className={styles.dashboard__balanceSeparator}></div>
              <button
                className={styles.dashboard__balanceButton}
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ThreeDots
                    visible={true}
                    height="12"
                    width="40"
                    color="#52555f"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                ) : (
                  "ПІДТВЕРДИТИ"
                )}
              </button>
            </div>

            <FaqModal isOpen={isFaqOpen} onClose={handleCloseFaq} />
          </div>
        </div>

        <div className={styles.dashboard__dateContainer}>
          <Calendar />
        </div>
      </div>

      <div className={styles.dashboard__transactionsContainer}>
        <TransactionBoard />
      </div>

      <div className={styles.dashboard__bottomSection}>
        <SummaryBoard />
      </div>

      <div className={styles.dashboard__bottomNav}>
        <Link
          href="/dashboard/expanses"
          className={`${styles.dashboard__navButton} ${styles.navExpanse}`}
        >
          ВИТРАТИ
        </Link>
        <Link
          href="/dashboard/income"
          className={`${styles.dashboard__navButton} ${styles.navIncome}`}
        >
          ДОХІД
        </Link>
      </div>
    </section>
  );
}
