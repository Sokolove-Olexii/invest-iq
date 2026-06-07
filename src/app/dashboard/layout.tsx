import DashboardHeader from "@/app/components/layout/DashboardHeader";
import styles from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout__wrapper}>
      <DashboardHeader />

      <main className={styles.layout__main}>
        {children}
      </main>
    </div>
  );
}
