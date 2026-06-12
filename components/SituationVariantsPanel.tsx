"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import CopyButton from "@/components/CopyButton";

type VarianteView = Readonly<{
  id: string;
  label: string;
  contenu: string;
}>;

type SituationVariantsPanelProps = Readonly<{
  variantes: VarianteView[];
  favoriteSlot?: ReactNode;
}>;

export default function SituationVariantsPanel({
  variantes,
  favoriteSlot
}: SituationVariantsPanelProps) {
  const [selectedVarianteId, setSelectedVarianteId] = useState(
    variantes[0]?.id ?? ""
  );

  const selectedVariante = useMemo(
    () =>
      variantes.find((variante: VarianteView) => variante.id === selectedVarianteId) ??
      variantes[0],
    [selectedVarianteId, variantes]
  );

  if (!selectedVariante) {
    return null;
  }

  return (
    <div className="space-y-3 sm:space-y-5">
      <div className="mx-2 rounded-[6px] bg-[linear-gradient(180deg,rgba(8,18,36,0.72)_0%,rgba(6,14,28,0.56)_100%)] p-2.5 shadow-[0_28px_46px_-36px_rgba(2,6,23,1),inset_0_1px_0_rgba(255,255,255,0.08)] sm:mx-0 sm:bg-transparent sm:p-0 sm:shadow-none">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0 flex-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center justify-center gap-2 sm:flex-wrap sm:justify-start sm:gap-3">
              {variantes.map((variante: VarianteView) => {
                const isActive = variante.id === selectedVariante.id;

                return (
                  <button
                    key={variante.id}
                    type="button"
                    onClick={() => setSelectedVarianteId(variante.id)}
                    className={`rounded-[6px] px-3 py-1.5 text-[11px] font-semibold leading-none shadow-[0_14px_24px_-18px_rgba(2,6,23,0.55)] transition focus:outline-none sm:min-h-11 sm:px-4 sm:py-2 sm:text-sm sm:leading-normal ${
                      isActive
                        ? "bg-[linear-gradient(135deg,#60a5fa_0%,#2563eb_100%)] text-white"
                        : "bg-[linear-gradient(180deg,rgba(21,49,97,0.95)_0%,rgba(14,36,77,0.95)_100%)] text-white hover:bg-[linear-gradient(180deg,rgba(26,58,112,0.98)_0%,rgba(18,42,88,0.98)_100%)]"
                    }`}
                  >
                    {variante.label}
                  </button>
                );
              })}
            </div>
          </div>
          {favoriteSlot ? <div className="shrink-0">{favoriteSlot}</div> : null}
        </div>
      </div>

      <div className="space-y-4">
        <div className="mx-2 -mt-[10px] rounded-[6px] bg-[linear-gradient(180deg,rgba(8,18,36,0.72)_0%,rgba(6,14,28,0.56)_100%)] p-2.5 shadow-[0_28px_46px_-36px_rgba(2,6,23,1),inset_0_1px_0_rgba(255,255,255,0.08)] sm:mx-0 sm:mt-0 sm:p-3">
          <div className="rounded-[6px] bg-[linear-gradient(180deg,#e6eef8_0%,#dde7f3_58%,#d4deec_100%)] px-4 py-4 text-[15px] leading-7 text-justify text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] ring-1 ring-[#d9e2f1]/95 sm:px-6 sm:py-5 sm:text-lg sm:leading-8">
            {selectedVariante.contenu}
          </div>
        </div>
        <div className="mx-2 sm:mx-0">
          <CopyButton text={selectedVariante.contenu} />
        </div>
      </div>
    </div>
  );
}

