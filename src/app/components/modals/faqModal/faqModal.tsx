import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./faqModal.module.scss";
import CloseIcon from "../../../../../public/icons/closeIcon.svg";

interface faqModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

export default function FaqModal({ isOpen, onClose }: faqModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.positionWrapper}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.modal}>
            <button onClick={onClose} className={styles.modal__closeButton}>
              <Image src={CloseIcon} alt="Close" width={10} height={10} />
            </button>
            <p className={styles.modal__mainText}>
              Привіт! Для початку роботи внесіть свій поточний баланс рахунку!
            </p>
            <p className={styles.modal__subText}>
              Ви не можете витрачати гроші, поки їх у Вас немає :)
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
