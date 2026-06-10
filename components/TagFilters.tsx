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
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            aria-pressed={isSelected}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-100 ${
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
