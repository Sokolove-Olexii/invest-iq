"use client";
import supabase from "@/lib/supabase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import styles from "./AuthForm.module.scss";

export default function AuthForm() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <section className={styles.auth}>
      <div className={styles.auth__logoScrollContainer}>
        <div className={styles.auth__logoScrollTrack}>
          <Image
            className={styles.auth__logoImage}
            src="/icons/LogoScroll.svg"
            alt="LogoScroll"
            width={1280}
            height={253}
            priority
          />
          <Image
            className={styles.auth__logoImage}
            src="/icons/LogoScroll.svg"
            alt="LogoScroll"
            width={1280}
            height={253}
            priority
          />
        </div>
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
            <Image
              src="/icons/googleIcon.svg"
              width={18}
              height={18}
              alt="Google"
            />
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
                  <Field
                    className={styles.auth__input}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                  />
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
