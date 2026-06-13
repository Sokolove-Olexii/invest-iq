"use client";

import styles from "./TransactionMobileForm.module.scss";
import { BackIcon, ArrowIcon, CalcIcon } from "@/assets/icons";
import { ThreeDots } from "react-loader-spinner";
import useTransactionForm from "@/hooks/useTransactionForm/useTransactionForm";
import TransactionsModal from "@/app/components/modals/transactionsModal/transactionsModal";
import Calendar from "@/app/components/calendar/Calendar";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface TransactionMobileFormProps {
  type: "income" | "expanse";
}

export default function TransactionMobileForm({ type }: TransactionMobileFormProps) {
  const {
    isLoading,
    isOpen,
    isTransactionModalOpen,
    setIsTransactionModalOpen,
    selectedCategoryLabel,
    handleSubmit,
    handleClear,
    description,
    setDescription,
    dropdownRef,
    category,
    setIsOpen,
    setCategory,
    amount,
    setAmount,
    date,
    setDate,
    categories,
  } = useTransactionForm(type);

  return (
    <section className={styles.form}>
      <div className={styles.form__topSection}>
        <div className={styles.form__headerRow}>
          <Link href="/dashboard" className={styles.form__backButton}>
            <Image src={BackIcon} alt="Back" width={24} height={24} />
          </Link>
          <Calendar selectedDate={date} onChange={setDate} />
        </div>

        <div className={styles.form__formWrapper}>
          <div className={styles.form__inputGroup}>
            <input
              type="text"
              className={styles.form__inputField}
              placeholder="Опис товару"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.form__separator}></div>

            <div
              className={styles.form__customSelectContainer}
              ref={dropdownRef}
            >
              <div
                className={`${styles.form__selectHeader} ${!category ? styles["form__selectHeader--placeholder"] : ""}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedCategoryLabel || "Категорія товару"}</span>
                <Image
                  src={ArrowIcon}
                  alt="Arrow"
                  width={12}
                  height={7}
                  className={`${styles.form__dropdownArrow} ${isOpen ? styles["form__dropdownArrow--open"] : ""}`}
                />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    className={styles.form__optionsList}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {categories.map((cat) => (
                      <li
                        key={cat.id}
                        className={`${styles.form__optionItem} ${category === cat.id ? styles["form__optionItem--active"] : ""}`}
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
          </div>

          <div className={styles.form__balanceContainer}>
            <div className={styles.form__amountWrapper}>
              <input
                type="number"
                className={styles.form__amountInput}
                placeholder="00.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className={styles.form__currencySuffix}>UAH</span>
            </div>
            <div className={styles.form__verticalSeparator}></div>
            <div className={styles.form__calculatorIcon}>
              <Image src={CalcIcon} alt="Calculator" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.form__bottomSection}>
        <div className={styles.form__actionButtons}>
          <button
            className={styles.form__btnSubmit}
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
            className={styles.form__btnClear}
            onClick={() => setIsTransactionModalOpen(true)}
          >
            ОЧИСТИТИ
          </button>
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
    </section>
  );
}
