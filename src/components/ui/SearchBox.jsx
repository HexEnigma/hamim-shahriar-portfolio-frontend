import { useEffect, useState } from "react";
import Input from "./Input";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBox({ value, onCommit, placeholder, label }) {
  const [text, setText] = useState(value ?? "");
  const debounced = useDebounce(text, 400);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setText(value); }, [value]); // back/forward navigation
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (debounced !== value) onCommit(debounced); }, [debounced]); // trigger search

  return (
    <Input
      type="search"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder={placeholder}
      aria-label={label}
    />
  );
}