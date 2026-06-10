"use client";

import { useEffect, useMemo, useState } from "react";

type CopyStatus = "idle" | "success" | "error";

type CopyButtonProps = Readonly<{
  text: string;
}>;

function getMobileActionClassName() {
  return "inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-semibold leading-none text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2";
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const encodedText = useMemo(() => encodeURIComponent(text), [text]);
  const whatsappHref = `https://wa.me/?text=${encodedText}`;
  const smsHref = `sms:?body=${encodedText}`;

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
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex items-center gap-1.5 sm:block">
        <button
          type="button"
          onClick={handleCopy}
          className={`${getMobileActionClassName()} sm:min-h-11 sm:bg-accent sm:px-4 sm:py-2 sm:text-sm sm:leading-normal sm:text-white sm:hover:bg-blue-700`}
        >
          Copier
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={`${getMobileActionClassName()} sm:hidden`}
        >
          WhatsApp
        </a>
        <a href={smsHref} className={`${getMobileActionClassName()} sm:hidden`}>
          SMS
        </a>
      </div>
      {status === "success" ? (
        <p className="text-xs font-medium text-green-700 sm:text-sm">
          Réponse copiée
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-xs font-medium text-red-700 sm:text-sm">
          Impossible de copier la réponse
        </p>
      ) : null}
    </div>
  );
}
