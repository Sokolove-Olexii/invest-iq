"use client";

import { useRouter } from "next/navigation";
import Logo from "../ui/Logo";
import styles from "./DashboardHeader.module.scss";
import supabase from "@/lib/supabase";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import QuitModal from "../modals/quitModal/quitModal";
import LogOutIcon from "../../../../public/icons/LogOutIcon.svg";

export default function DashboardHeader() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <motion.header
      className={styles.header}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className={styles.header__container}>
        <div className={styles.header__logoWrapper}>
          <Logo href="/dashboard" />
        </div>
        <div className={styles.header__userSection}>
          <div className={styles.header__userInfo}>
            <div className={styles.header__avatar}>U</div>
            <p className={styles.header__userName}>User name</p>
          </div>

          <button
            className={styles.header__logoutButton}
            onClick={() => setIsQuitModalOpen(true)}
          >
            <Image src={LogOutIcon} alt="LogOutIcon" width={16} height={16} />
          </button>
        </div>
      </div>

      <QuitModal
        isOpen={isQuitModalOpen}
        onClose={() => setIsQuitModalOpen(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </motion.header>
  );
}
