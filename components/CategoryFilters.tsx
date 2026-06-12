type CategoryFiltersProps = Readonly<{
  categories: string[];
  selectedCategory: string | null;
  onToggleCategory: (category: string) => void;
}>;

export default function CategoryFilters({
  categories,
  selectedCategory,
  onToggleCategory
}: CategoryFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
      {categories.map((category: string) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onToggleCategory(category)}
            aria-pressed={isSelected}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium leading-none transition focus:outline-none sm:min-h-11 sm:px-4 sm:py-2 sm:text-sm sm:leading-normal ${
              isSelected
                ? "bg-[linear-gradient(135deg,#60a5fa_0%,#2563eb_100%)] text-white"
                : "bg-[linear-gradient(180deg,rgba(21,49,97,0.95)_0%,rgba(14,36,77,0.95)_100%)] text-white hover:bg-[linear-gradient(180deg,rgba(26,58,112,0.98)_0%,rgba(18,42,88,0.98)_100%)]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}