"use client";

import Logo from "../ui/Logo";
import styles from "./DashboardHeader.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import QuitModal from "../modals/quitModal/quitModal";
import LogOutIcon from "../../../../public/icons/LogOutIcon.svg";
import useDashboardHeader from "@/hooks/useDashboardHeader/useDashboardHeader";

export default function DashboardHeader() {
  const {
    hidden,
    isQuitModalOpen,
    isLoggingOut,
    setIsQuitModalOpen,
    handleLogout,
  } = useDashboardHeader();

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
