"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./TransactionBoard.module.scss";
import Calendar from "@/app/components/calendar/Calendar";
import { expanseCategories } from "@/data/categoryData";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import { useBalanceStore } from "@/store/useBalanceStore";
import TransactionCard from "../transactionCard/TransactionCard";
import Image from "next/image";
import ArrowIcon from "../../../../public/icons/ArrowIcon.svg";
import CalcIcon from "../../../../public/icons/CalcIcon.svg";
import TransactionsModal from "../modals/transactionsModal/transactionsModal";
import SummaryBoard from "../summaryBoard/summaryBoard";
import { ThreeDots } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

export default function TransactionBoard() {
  const [activeTab, setActiveTab] = useState<"expanse" | "income">("expanse");
  const { balance, updateBalance } = useBalanceStore();
  const { transactions, addTransaction, isLoading } = useTransactionsStore();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategoryLabel = expanseCategories.find(
    (c) => c.id === category,
  )?.label;

  const handleSubmit = async () => {
    if (!description || !category || !amount) return;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    await addTransaction({
      description,
      category,
      amount: parsedAmount,
      type: activeTab,
      ...(date ? { created_at: date.toISOString() } : {}),
    });

    const newBalance =
      activeTab === "income" ? balance + parsedAmount : balance - parsedAmount;
    await updateBalance(newBalance);

    setDescription("");
    setCategory("");
    setAmount("");
    setDate(new Date());
  };

  const handleClear = () => {
    setDescription("");
    setCategory("");
    setAmount("");
    setDate(new Date());
  };

  const filteredTransactions = transactions.filter((t) => t.type === activeTab);

  return (
    <div className={styles.board}>
      <h3 className={styles.board__mobileTitle}>Останні транзакції</h3>

      <div className={styles.board__tabs}>
        <button
          className={`${styles.board__tab} ${activeTab === "expanse" ? styles["board__tab--active"] : ""}`}
          onClick={() => setActiveTab("expanse")}
        >
          ВИТРАТИ
        </button>
        <button
          className={`${styles.board__tab} ${activeTab === "income" ? styles["board__tab--active"] : ""}`}
          onClick={() => setActiveTab("income")}
        >
          ДОХІД
        </button>
      </div>

      <div
        className={`${styles.board__card} ${activeTab === "income" ? styles["board__card--incomeActive"] : ""}`}
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
                    {expanseCategories.map((cat) => (
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
              <div className={styles.board__calculatorIcon}>
                <Image src={CalcIcon} alt="Calculator" width={20} height={20} />
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
            <button className={styles.board__btnClear} onClick={() => setIsTransactionModalOpen(true)}>
              ОЧИСТИТИ
            </button>
          </div>
        </div>

        <div className={styles.board__transactionsListMobile}>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
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
                  {filteredTransactions.map((transaction) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                    />
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
                  <p className={styles.board__emptyState}>Транзакцій ще немає</p>
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
            <SummaryBoard />
          </div>
        </div>
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
