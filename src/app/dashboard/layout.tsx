import styles from "./layout.module.scss";
import DashboardHeader from "@/app/components/layout/DashboardHeader";
import AuthGuard from "@/app/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className={styles.layout__wrapper}>
        <DashboardHeader />

        <main className={styles.layout__main}>{children}</main>
      </div>
    </AuthGuard>
  );
}
