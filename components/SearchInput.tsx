type SearchInputProps = Readonly<{
  value: string;
  onChange: (value: string) => void;
}>;

export default function SearchInput({
  value,
  onChange
}: SearchInputProps) {
  return (
    <label className="block w-full">
      <span className="sr-only">Rechercher une situation</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher une situation..."
        className="w-full rounded-[6px] bg-[linear-gradient(180deg,#f7fbff_0%,#ebf2fc_56%,#dfe8f6_100%)] px-6 py-4 text-[15px] text-slate-950 shadow-[0_14px_22px_-14px_rgba(255,255,255,0.88),0_34px_52px_-34px_rgba(2,6,23,0.62),inset_0_1px_0_rgba(255,255,255,0.94)] outline-none ring-1 ring-[#d7e2f0] transition placeholder:text-slate-500 focus:ring-2 focus:ring-blue-200 sm:rounded-[6px] sm:px-5 sm:py-4 sm:text-base"
      />
    </label>
  );
}
