import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import FormField from "./FormField";
import { applyServerErrors, getErrorMessage } from "@/utils/validators";

const blank = (fields) => Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? false : f.default ?? ""]));
const fromRow = (fields, row) =>
  Object.fromEntries(fields.map((f) => [f.name, row[f.name] ?? (f.type === "checkbox" ? false : "")]));

export default function ResourceDialog({ open, onClose, title, fields, row, mutation, idOf = (r) => r.id }) {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({ defaultValues: blank(fields) });
  useEffect(() => { if (open) reset(row ? fromRow(fields, row) : blank(fields)); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values) => {
    const body = Object.fromEntries(fields.map((f) => {
      let v = values[f.name];
      if (f.type === "number") v = v === "" ? null : Number(v);
      if (f.type === "date" && v === "") v = null;
      return [f.name, v];
    }));
    mutation.mutate({ id: row ? idOf(row) : null, body }, {
      onSuccess: () => { toast.success("Saved."); onClose(); },
      onError: (err) => { if (!applyServerErrors(err, setError)) toast.error(getErrorMessage(err)); },
    });
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
        {fields.map((f) => <FormField key={f.name} f={f} register={register} errors={errors} />)}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={mutation.isPending}>Save</Button>
        </div>
      </form>
    </Modal>
  );
}