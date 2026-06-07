import styles from "./page.module.scss";
import Header from "@/app/components/layout/Header";
import AuthForm from "@/app/components/forms/AuthForm";
import Image from "next/image";
export default function Home() {
  return (
    <main className={styles.home}>
      <Header />
      <AuthForm />
      <Image
        className={styles.home__bottomIcon}
        src="/icons/BottomIcon.svg"
        alt="BottomIcon"
        width={198}
        height={158}
        priority
      />
    </main>
  );
}
