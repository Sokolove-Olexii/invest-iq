import styles from "./Header.module.scss";
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo href="/dashboard" />
    </header>
  );
}
