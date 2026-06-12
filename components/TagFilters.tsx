type TagFiltersProps = Readonly<{
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}>;

export default function TagFilters({
  tags,
  selectedTags,
  onToggleTag
}: TagFiltersProps) {
  return (
    <div className="grid w-full grid-cols-4 gap-2 sm:flex sm:w-auto sm:flex-wrap">
      {tags.map((tag: string) => {
        const isSelected = selectedTags.includes(tag);

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            aria-pressed={isSelected}
            className={`min-w-0 rounded-full px-1.5 py-1 text-[10px] font-medium leading-none transition focus:outline-none sm:min-h-10 sm:w-auto sm:px-3 sm:py-1.5 sm:text-xs sm:leading-normal ${
              isSelected
                ? "bg-[linear-gradient(135deg,#60a5fa_0%,#2563eb_100%)] text-white"
                : "bg-[linear-gradient(180deg,rgba(21,49,97,0.95)_0%,rgba(14,36,77,0.95)_100%)] text-white hover:bg-[linear-gradient(180deg,rgba(26,58,112,0.98)_0%,rgba(18,42,88,0.98)_100%)]"
            }`}
          >
            <span className="block truncate">{tag}</span>
          </button>
        );
      })}
    </div>
  );
}

