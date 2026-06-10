"use client";

import { useEffect, useState } from "react";

type CopyStatus = "idle" | "success" | "error";

type CopyButtonProps = Readonly<{
  text: string;
}>;

export default function CopyButton({ text }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    if (status === "idle") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus("idle");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
      >
        Copier
      </button>
      {status === "success" ? (
        <p className="text-sm font-medium text-green-700">Réponse copiée</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm font-medium text-red-700">
          Impossible de copier la réponse
        </p>
      ) : null}
    </div>
  );
}
