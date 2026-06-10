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
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onToggleCategory(category)}
            aria-pressed={isSelected}
            className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none transition focus:outline-none focus:ring-2 focus:ring-blue-100 sm:min-h-11 sm:px-4 sm:py-2 sm:text-sm sm:leading-normal ${
              isSelected
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
