"use client";

import { useEffect, useMemo, useState } from "react";

type CopyStatus = "idle" | "success" | "error";

type CopyButtonProps = Readonly<{
  text: string;
}>;

function getActionClassName(tone: "neutral" | "whatsapp" | "sms") {
  if (tone === "whatsapp") {
    return "inline-flex min-w-[84px] flex-1 items-center justify-center rounded-[6px] bg-[linear-gradient(180deg,#2f9d73_0%,#1f7f5a_100%)] px-3 py-1.5 text-[11px] font-semibold leading-none text-white shadow-[0_14px_26px_-18px_rgba(16,86,62,0.65),inset_0_1px_0_rgba(255,255,255,0.18)] transition hover:brightness-105 focus:outline-none sm:min-w-[92px] sm:flex-none sm:px-3 sm:py-2 sm:text-xs sm:leading-normal";
  }

  if (tone === "sms") {
    return "inline-flex min-w-[84px] flex-1 items-center justify-center rounded-[6px] bg-[linear-gradient(180deg,#4c8df6_0%,#2563eb_100%)] px-3 py-1.5 text-[11px] font-semibold leading-none text-white shadow-[0_14px_26px_-18px_rgba(37,99,235,0.7),inset_0_1px_0_rgba(255,255,255,0.18)] transition hover:brightness-105 focus:outline-none sm:min-w-[92px] sm:flex-none sm:px-3 sm:py-2 sm:text-xs sm:leading-normal";
  }

  return "inline-flex min-w-[84px] flex-1 items-center justify-center rounded-[6px] bg-[linear-gradient(180deg,#edf3ff_0%,#dbe7f9_100%)] px-3 py-1.5 text-[11px] font-semibold leading-none text-slate-800 shadow-[0_14px_26px_-18px_rgba(2,6,23,0.42),inset_0_1px_0_rgba(255,255,255,0.82)] transition hover:brightness-105 focus:outline-none sm:min-w-[92px] sm:flex-none sm:px-3 sm:py-2 sm:text-xs sm:leading-normal";
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
    <div className="space-y-2">
      <div className="flex flex-nowrap items-center justify-center gap-2 rounded-[6px] bg-[linear-gradient(180deg,rgba(10,21,40,0.56)_0%,rgba(7,16,31,0.42)_100%)] px-2.5 py-3 shadow-[0_28px_46px_-36px_rgba(2,6,23,1),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:gap-3 sm:px-4">
        <button type="button" onClick={handleCopy} className={getActionClassName("neutral")}>
          Copier
        </button>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className={getActionClassName("whatsapp")}>
          WhatsApp
        </a>
        <a href={smsHref} className={getActionClassName("sms")}>
          SMS
        </a>
      </div>
      {status === "success" ? (
        <p className="text-center text-xs font-medium text-emerald-200 sm:text-sm">
          Réponse copiée
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-center text-xs font-medium text-rose-200 sm:text-sm">
          Impossible de copier la réponse
        </p>
      ) : null}
    </div>
  );
}

