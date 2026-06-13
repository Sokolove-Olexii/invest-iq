import styles from "./quitModal.module.scss";
import { CloseIcon } from "@/assets/icons";
import { ThreeDots } from "react-loader-spinner";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";

interface QuitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function QuitModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
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
          Ви дійсно хочете вийти?
        </DialogTitle>

        <div className={styles.buttons_container}>
          <button
            className={`${styles.button} ${styles["button--confirm"]}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <ThreeDots
                visible={true}
                height="12"
                width="40"
                color="#ffffff"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            ) : (
              "ТАК"
            )}
          </button>
          <button
            className={`${styles.button} ${styles["button--cancel"]}`}
            onClick={onClose}
            disabled={isLoading}
          >
            НІ
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
