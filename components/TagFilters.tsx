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
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => {
        const isSelected = selectedTags.includes(tag);

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            aria-pressed={isSelected}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none transition focus:outline-none focus:ring-2 focus:ring-blue-100 sm:min-h-11 sm:px-4 sm:py-2 sm:text-sm sm:leading-normal ${
              isSelected
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
