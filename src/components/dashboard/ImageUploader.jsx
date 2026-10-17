import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

export default function ImageUploader({ label, currentUrl, file, onChange, error, aspect = "aspect-video" }) {
  const input = useRef(null);
  const [preview, setPreview] = useState(null);
  const [local, setLocal] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!/\.(jpe?g|png|webp)$/i.test(f.name)) return setLocal("Only .jpg, .jpeg, .png and .webp images are allowed.");
    if (f.size > 2 * 1024 * 1024) return setLocal("Image must be 2 MB or smaller.");
    setLocal("");
    onChange(f);
  };
  const src = preview ?? currentUrl;
  const message = local || error;

  return (
    <div>
      <p className="mb-1 text-sm font-medium">{label}</p>
      <div className={`${aspect} max-w-[400px] overflow-hidden rounded-lg border border-line bg-surface2`}>
        {src ? <img src={src} alt={preview ? "Preview of the selected image" : "Current image"} className="h-full w-full object-cover" />
             : <div className="grid h-full place-items-center text-sm text-muted">No image</div>}
      </div>
      <input ref={input} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={pick} className="sr-only" aria-label={label} />
      <div className="mt-1 flex gap-1">
        <Button variant="secondary" onClick={() => input.current.click()}>{src ? "Replace image" : "Choose image"}</Button>
        {file && <Button variant="ghost" onClick={() => { onChange(null); setLocal(""); }}>Undo</Button>}
      </div>
      <p className="mt-1 text-xs text-muted">JPG, PNG or WebP, up to 2 MB.</p>
      {message && <p role="alert" className="mt-1 text-sm text-danger">{message}</p>}
    </div>
  );
}