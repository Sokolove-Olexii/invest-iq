"use client";
import { useBalanceStore } from "@/store/useBalanceStore";
import { useTransactionsStore } from "@/store/useTransactionsStore";
import styles from "./income.module.scss";
import Link from "next/link";
import Image from "next/image";
import Calendar from "@/app/components/calendar/Calendar";
import { useState, useRef, useEffect } from "react";
import { expanseCategories } from "@/data/categoryData";

export default function Expanses() {
  const { balance, updateBalance } = useBalanceStore();
  const { addTransaction } = useTransactionsStore();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

    const expanseAmount = parseFloat(amount);
    if (isNaN(expanseAmount) || expanseAmount <= 0) return;

    await addTransaction({
      description,
      category,
      amount: expanseAmount,
      type: "income",
      ...(date ? { created_at: date.toISOString() } : {}),
    });

    const newBalance = balance + expanseAmount;
    await updateBalance(newBalance);

    setDescription("");
    setCategory("");
    setAmount("");
    setDate(new Date());
  };

  return (
    <section className={styles.expanses}>
      <div className={styles.expanses__topSection}>
        <div className={styles.expanses__headerRow}>
          <Link href="/dashboard" className={styles.expanses__backButton}>
            <Image src="/icons/BackIcon.svg" alt="Back" width={24} height={24} />
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
                  src="/icons/ArrowIcon.svg"
                  alt="Arrow"
                  width={12}
                  height={7}
                  className={`${styles.expanses__dropdownArrow} ${isOpen ? styles["expanses__dropdownArrow--open"] : ""}`}
                />
              </div>

              {isOpen && (
                <ul className={styles.expanses__optionsList}>
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
                </ul>
              )}
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
            <button className={styles.expanses__calculatorButton}>
              <Image
                src="/icons/CalcIcon.svg"
                alt="Calculator"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.expanses__bottomSection}>
        <div className={styles.expanses__actionButtons}>
          <button className={styles.expanses__btnSubmit} onClick={handleSubmit}>
            ВВЕСТИ
          </button>
          <button
            className={styles.expanses__btnClear}
            onClick={() => {
              setDescription("");
              setCategory("");
              setAmount("");
              setDate(new Date());
            }}
          >
            ОЧИСТИТИ
          </button>
        </div>
      </div>
    </section>
  );
}
