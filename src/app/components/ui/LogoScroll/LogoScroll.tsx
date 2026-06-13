import styles from "./LogoScroll.module.scss";
import Image from "next/image";
import { LogoScrollIcon } from "@/assets/icons";

export default function LogoScroll() {
  return (
    <div className={styles.scrollTrack}>
      <Image
        className={styles.image}
        src={LogoScrollIcon}
        alt="LogoScroll"
        width={1280}
        height={253}
        priority
      />
      <Image
        className={styles.image}
        src={LogoScrollIcon}
        alt="LogoScroll"
        width={1280}
        height={253}
        priority
      />
    </div>
  );
}
