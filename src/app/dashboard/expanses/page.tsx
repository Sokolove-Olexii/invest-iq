"use client";
import styles from "./expanses.module.scss";
import Link from "next/link";
import Image from "next/image";
import Calendar from "@/app/components/calendar/Calendar";
import { expanseCategories } from "@/data/categoryData";
import BackIcon from "../../../../public/icons/BackIcon.svg";
import ArrowIcon from "../../../../public/icons/ArrowIcon.svg";
import CalcIcon from "../../../../public/icons/CalcIcon.svg";
import TransactionsModal from "../../components/modals/transactionsModal/transactionsModal";
import { ThreeDots } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import useExpanses from "@/hooks/useExpanses/useExpanses";

export default function Expanses() {
  const {
    date,
    setDate,
    description,
    setDescription,
    dropdownRef,
    setIsOpen,
    category,
    selectedCategoryLabel,
    isOpen,
    amount,
    setAmount,
    handleSubmit,
    handleClear,
    setCategory,
    isLoading,
    setIsTransactionModalOpen,
    isTransactionModalOpen,
  } = useExpanses();

  return (
    <section className={styles.expanses}>
      <div className={styles.expanses__topSection}>
        <div className={styles.expanses__headerRow}>
          <Link href="/dashboard" className={styles.expanses__backButton}>
            <Image src={BackIcon} alt="Back" width={24} height={24} />
          </Link>
          <Calendar selectedDate={date} onChange={setDate} />
        </div>

        <div className={styles.expanses__formWrapper}>
          <div className={styles.expanses__inputGroup}>
            <input
              type="text"
              className={styles.expanses__inputField}
              placeholder="Опис товару"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className={styles.expanses__separator}></div>

            <div
              className={styles.expanses__customSelectContainer}
              ref={dropdownRef}
            >
              <div
                className={`${styles.expanses__selectHeader} ${!category ? styles["expanses__selectHeader--placeholder"] : ""}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedCategoryLabel || "Категорія товару"}</span>
                <Image
                  src={ArrowIcon}
                  alt="Arrow"
                  width={12}
                  height={7}
                  className={`${styles.expanses__dropdownArrow} ${isOpen ? styles["expanses__dropdownArrow--open"] : ""}`}
                />
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    className={styles.expanses__optionsList}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expanseCategories.map((cat) => (
                      <li
                        key={cat.id}
                        className={`${styles.expanses__optionItem} ${category === cat.id ? styles["expanses__optionItem--active"] : ""}`}
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

          <div className={styles.expanses__balanceContainer}>
            <div className={styles.expanses__amountWrapper}>
              <input
                type="number"
                className={styles.expanses__amountInput}
                placeholder="00.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className={styles.expanses__currencySuffix}>UAH</span>
            </div>
            <div className={styles.expanses__verticalSeparator}></div>
            <div className={styles.expanses__calculatorIcon}>
              <Image src={CalcIcon} alt="Calculator" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.expanses__bottomSection}>
        <div className={styles.expanses__actionButtons}>
          <button
            className={styles.expanses__btnSubmit}
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
            className={styles.expanses__btnClear}
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
