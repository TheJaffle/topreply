import BrandMark from "@/components/BrandMark";

type BrandFooterProps = Readonly<{
  fixed?: boolean;
}>;

export default function BrandFooter({ fixed = false }: BrandFooterProps) {
  return (
    <div
      className={fixed
        ? "fixed inset-x-4 bottom-1 z-[70] rounded-[6px] bg-[linear-gradient(180deg,rgba(6,14,28,0.82)_0%,rgba(7,17,33,0.74)_100%)] px-4 py-2.5 text-blue-50 shadow-[0_28px_50px_-36px_rgba(2,6,23,1)] backdrop-blur-xl sm:static sm:rounded-[6px] sm:bg-[linear-gradient(180deg,rgba(6,14,28,0.68)_0%,rgba(7,17,33,0.52)_100%)] sm:px-5 sm:py-3"
        : "rounded-[6px] bg-[linear-gradient(180deg,rgba(6,14,28,0.68)_0%,rgba(7,17,33,0.52)_100%)] px-4 py-2.5 text-blue-50 shadow-[0_28px_50px_-36px_rgba(2,6,23,1)] backdrop-blur-xl sm:rounded-[6px] sm:px-5 sm:py-3"}
    >
      <div className="flex items-center gap-2.5">
        <BrandMark />
        <div className="space-y-0">
          <p className="text-sm font-semibold tracking-[0.08em] text-white sm:text-base">
            REL<span className="font-medium text-blue-200/90">VIA</span>
          </p>
          <p className="text-[10px] leading-4 text-blue-100/74 sm:text-xs sm:leading-5">
            La bonne formulation, rapidement.
          </p>
        </div>
      </div>
    </div>
  );
}
