import Link from "next/link";
import styles from "./Logo.module.scss";

interface LogoProps {
  href?: string;
}

export default function Logo({ href = "/" }: LogoProps) {
  return (
    <Link href={href} className={styles.logo}>
      <div className={styles.logo__container}>
        <div className={styles.logo__shapeLight}></div>
        <div className={styles.logo__shapeDark}></div>
        <span className={styles.logo__text}>INVESTIQ</span>
      </div>
    </Link>
  );
}
