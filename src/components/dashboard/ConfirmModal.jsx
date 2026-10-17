import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function ConfirmModal({ open, title = "Are you sure?", message, confirmLabel = "Delete", loading, onConfirm, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-muted">{message}</p>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}