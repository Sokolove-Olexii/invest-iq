import styles from "./page.module.scss";
import Header from "@/app/components/layout/Header";
import AuthForm from "@/app/components/forms/AuthForm";
import Image from "next/image";
import BottomIcon from "../../public/icons/BottomIcon.svg";
import GuestGuard from "@/app/components/auth/GuestGuard";

export default function Home() {
  return (
    <GuestGuard>
      <main className={styles.home}>
        <Header />
        <AuthForm />
        <Image
          className={styles.home__bottomIcon}
          src={BottomIcon}
          alt="BottomIcon"
          width={198}
          height={158}
          priority
        />
      </main>
    </GuestGuard>
  );
}
