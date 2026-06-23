export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

export interface ConfirmModalProps extends BaseModalProps {
  onConfirm: () => void;
}
