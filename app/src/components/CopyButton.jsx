import React, { useState, useEffect } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";

export default function CopyButton({ text, label = "Copy", className = "" }) {
  const [status, setStatus] = useState("idle"); // idle | copied | error

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch (err) {
      console.error("Failed to copy text:", err);
      setStatus("error");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        status === "copied"
          ? "bg-emerald-50 text-emerald-700"
          : status === "error"
          ? "bg-rose-50 text-rose-700"
          : "bg-stone-100 hover:bg-stone-200 text-stone-600"
      } ${className}`}
    >
      <span aria-live="polite">
        {status === "copied" ? (
          <>
            <Check className="w-3.5 h-3.5 inline" />
            {" "}Copied!
          </>
        ) : status === "error" ? (
          <>
            <AlertCircle className="w-3.5 h-3.5 inline" />
            {" "}Copy failed
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 inline" />
            {" "}{label}
          </>
        )}
      </span>
    </button>
  );
}
