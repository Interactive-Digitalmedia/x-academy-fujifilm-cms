import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  showReasonInput?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  showReasonInput = false,
}: ConfirmationModalProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!isOpen) setReason("");
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm(showReasonInput ? reason.trim() : undefined);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDismissable
      placement="center"
      size="md"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="text-lg font-semibold">{title}</ModalHeader>
        <ModalBody>
          <p className="text-sm text-default-500">{description}</p>

          {/* {showReasonInput && (
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason (optional)"
              label="Reason"
              labelPlacement="outside"
              className="mt-3"
            />
          )} */}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            {cancelText}
          </Button>
          <Button color="danger" onPress={handleConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
