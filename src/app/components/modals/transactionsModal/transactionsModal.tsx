import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import styles from "./transactionsModal.module.scss";
import CloseIcon from "../../../../../public/icons/closeIcon.svg";

interface QuitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function QuitModal({
  isOpen,
  onClose,
  onConfirm,
}: QuitModalProps) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className={styles.backdrop}
      onClose={onClose}
    >
      <DialogPanel className={styles.modal}>
        <button onClick={onClose} className={styles.close_button}>
          <Image src={CloseIcon} alt="Close" width={14} height={14} />
        </button>

        <DialogTitle as="h3" className={styles.title}>
          Ви дійсно хочете очистити?
        </DialogTitle>

        <div className={styles.buttons_container}>
          <button
            className={`${styles.button} ${styles["button--confirm"]}`}
            onClick={onConfirm}
          >
            ТАК
          </button>
          <button
            className={`${styles.button} ${styles["button--cancel"]}`}
            onClick={onClose}
          >
            НІ
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
