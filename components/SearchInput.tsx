type SearchInputProps = Readonly<{
  value: string;
  onChange: (value: string) => void;
}>;

export default function SearchInput({
  value,
  onChange
}: SearchInputProps) {
  return (
    <label className="block">
      <span className="sr-only">Rechercher une situation</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher une situation..."
        className="w-full rounded-[1.5rem] border border-stone-200 bg-white px-5 py-4 text-base text-stone-900 shadow-panel outline-none transition placeholder:text-stone-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
