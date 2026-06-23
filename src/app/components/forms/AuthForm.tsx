"use client";

import styles from "./AuthForm.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { GoogleIcon } from "@/assets/icons";
import LogoScroll from "@/app/components/ui/LogoScroll/LogoScroll";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AuthForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    const basePath = window.location.pathname.startsWith("/invest-iq")
      ? "/invest-iq"
      : "";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${basePath}/dashboard`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });
    if (error) {
      console.error("Виникла помилка:", error.message);
      toast.error("Не вдалося відкрити вікно Google");
    }
  };

  return (
    <section className={styles.auth}>
      <div className={styles.auth__logoScrollContainer}>
        <LogoScroll />
      </div>

      <div className={styles.auth__position}>
        <div className={styles.auth__header}>
          <span className={styles.auth__logoTitle}>InvestIQ</span>
          <p className={styles.auth__logoSub}>SMART FINANCE</p>
        </div>

        <div className={styles.auth__card}>
          <p className={styles.auth__prompt}>
            Ви можете авторизуватися за допомогою акаунта Google
          </p>

          <button
            className={styles.auth__btnGoogle}
            onClick={handleGoogleLogin}
            type="button"
          >
            <Image src={GoogleIcon} width={18} height={18} alt="Google" />
            Google
          </button>

          <p className={styles.auth__promptSmall}>
            Або увійти за допомогою ел. пошти та паролю після реєстрації
          </p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors: Record<string, string> = {};

              if (!values.email) {
                errors.email = "Обов'язкове поле";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Невірний формат email";
              }

              if (!values.password) {
                errors.password = "Обов'язкове поле";
              } else if (values.password.length < 6) {
                errors.password = "Мінімум 6 символів";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
              });
              if (error) {
                setFieldError("email", error.message);
              } else {
                router.push("/dashboard");
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, values, setSubmitting, setFieldError }) => (
              <Form className={styles.auth__form}>
                <div className={styles.auth__inputGroup}>
                  <label className={styles.auth__label}>
                    Електронна пошта:
                  </label>
                  <Field
                    className={styles.auth__input}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.auth__error}
                  />
                </div>

                <div className={styles.auth__inputGroup}>
                  <label className={styles.auth__label}>Пароль:</label>
                  <div className={styles.auth__passwordWrapper}>
                    <Field
                      className={styles.auth__input}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Пароль"
                    />
                    <button
                      type="button"
                      className={styles.auth__passwordToggle}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {showPassword ? (
                          <motion.svg
                            key="eye-off"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </motion.svg>
                        ) : (
                          <motion.svg
                            key="eye-open"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.auth__error}
                  />
                </div>

                <div className={styles.auth__btnGroup}>
                  <button
                    className={styles.auth__btnLogin}
                    type="button"
                    disabled={isSubmitting}
                    onClick={async () => {
                      setSubmitting(true);

                      const { error } = await supabase.auth.signInWithPassword({
                        email: values.email,
                        password: values.password,
                      });

                      if (error) {
                        setFieldError("password", "Невірний логін або пароль");
                      } else {
                        router.push("/dashboard");
                        toast.success("Логін успішний");
                      }

                      setSubmitting(false);
                    }}
                  >
                    УВІЙТИ
                  </button>

                  <button
                    className={styles.auth__btnRegister}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    РЕЄСТРАЦІЯ
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
