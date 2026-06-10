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
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onToggleCategory(category)}
            aria-pressed={isSelected}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-100 ${
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
