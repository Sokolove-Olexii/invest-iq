"use client";
import styles from "./TransactionBoard.module.scss";
import Calendar from "@/app/components/calendar/Calendar";
import TransactionCard from "../transactionCard/TransactionCard";
import Image from "next/image";
import ArrowIcon from "../../../../public/icons/ArrowIcon.svg";
import CalcIcon from "../../../../public/icons/CalcIcon.svg";
import TransactionsModal from "../modals/transactionsModal/transactionsModal";
import SummaryBoard from "../summaryBoard/summaryBoard";
import { ThreeDots } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import useTransactionBoard from "@/hooks/useTransactionBoard/useTransactionBoard";

export default function TransactionBoard() {
  const {
    activeTab,
    setActiveTab,
    setCategory,
    date,
    setDate,
    description,
    setDescription,
    dropdownRef,
    setIsOpen,
    category,
    selectedCategoryLabel,
    currentCategories,
    amount,
    setAmount,
    handleSubmit,
    setIsTransactionModalOpen,
    transactions,
    filteredTransactions,
    isTransactionModalOpen,
    handleClear,
    isOpen,
    isLoading,
  } = useTransactionBoard();

  return (
    <div className={styles.board}>
      <h3 className={styles.board__mobileTitle}>Останні транзакції</h3>

      <div className={styles.board__tabs}>
        <button
          className={`${styles.board__tab} ${activeTab === "expanse" ? styles["board__tab--active"] : ""}`}
          onClick={() => {
            setActiveTab("expanse");
            setCategory("");
          }}
        >
          ВИТРАТИ
        </button>
        <button
          className={`${styles.board__tab} ${activeTab === "income" ? styles["board__tab--active"] : ""}`}
          onClick={() => {
            setActiveTab("income");
            setCategory("");
          }}
        >
          ДОХІД
        </button>
      </div>

      <div
        className={`${styles.board__card} ${activeTab === "income" ? styles["board__card--incomeActive"] : ""}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            <div className={styles.board__form}>
              <div className={styles.board__formRow}>
                <Calendar selectedDate={date} onChange={setDate} />
                <div className={styles.board__inputsGroup}>
                  <input
                    type="text"
                    className={styles.board__inputField}
                    placeholder="Опис товару"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div
                    className={styles.board__customSelectContainer}
                    ref={dropdownRef}
                  >
                    <div
                      className={`${styles.board__selectHeader} ${!category ? styles["board__selectHeader--placeholder"] : ""}`}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span>{selectedCategoryLabel || "Категорія товару"}</span>
                      <Image
                        src={ArrowIcon}
                        alt="Arrow"
                        width={12}
                        height={7}
                        className={`${styles.board__dropdownArrow} ${isOpen ? styles["board__dropdownArrow--open"] : ""}`}
                      />
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.ul
                          className={styles.board__optionsList}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {currentCategories.map((cat) => (
                            <li
                              key={cat.id}
                              className={`${styles.board__optionItem} ${category === cat.id ? styles["board__optionItem--active"] : ""}`}
                              onClick={() => {
                                setCategory(cat.id);
                                setIsOpen(false);
                              }}
                            >
                              {cat.label}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={styles.board__amountWrapper}>
                    <input
                      type="number"
                      className={styles.board__amountInput}
                      placeholder="00.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <span className={styles.board__amountCurrency}>UAH</span>
                    <div className={styles.board__calculatorIcon}>
                      <Image
                        src={CalcIcon}
                        alt="Calculator"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.board__formActions}>
                <button
                  className={styles.board__btnSubmit}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ThreeDots
                      visible={true}
                      height="12"
                      width="40"
                      color="#ffffff"
                      radius="9"
                      ariaLabel="three-dots-loading"
                    />
                  ) : (
                    "ВВЕСТИ"
                  )}
                </button>
                <button
                  className={styles.board__btnClear}
                  onClick={() => setIsTransactionModalOpen(true)}
                >
                  ОЧИСТИТИ
                </button>
              </div>
            </div>

            <div className={styles.board__transactionsListMobile}>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              ) : (
                <p className={styles.board__emptyState}>Транзакцій ще немає</p>
              )}
            </div>

            <div className={styles.board__tableAndSummaryContainer}>
              <div className={styles.board__tableWrapperTablet}>
                <div className={styles.board__tableHeaders}>
                  <span>ДАТА</span>
                  <span>ОПИС</span>
                  <span>КАТЕГОРІЯ</span>
                  <span className={styles.board__tableHeaderAmount}>СУМА</span>
                  <span></span>
                </div>

                <div className={styles.board__transactionsListTablet}>
                  {filteredTransactions.length > 0 ? (
                    <>
                      {filteredTransactions.map((transaction, index) => (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.05,
                            ease: "easeOut",
                          }}
                          layout
                        >
                          <TransactionCard transaction={transaction} />
                        </motion.div>
                      ))}
                      {Array.from({
                        length: Math.max(0, 9 - filteredTransactions.length),
                      }).map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className={styles.board__emptyRow}
                        ></div>
                      ))}
                    </>
                  ) : (
                    <>
                      <p className={styles.board__emptyState}>
                        Транзакцій ще немає
                      </p>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className={styles.board__emptyRow}
                        ></div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className={styles.board__summaryDesktop}>
                <SummaryBoard activeTab={activeTab} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <TransactionsModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onConfirm={() => {
          handleClear();
          setIsTransactionModalOpen(false);
        }}
      />
    </div>
  );
}
