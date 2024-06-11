export default function TagOptionGroup({
  tags,
  selectedTags = [],
  setSelectedTags,
  singleChoice,
}: {
  tags: string[] | undefined;
  selectedTags: string[] | undefined;
  setSelectedTags: (tags: string[]) => void;
  singleChoice?: boolean;
}) {
  if (!tags) return null;

  return (
    <div>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <span
            key={tag}
            className={`font-title ${
              isSelected
                ? "bg-digitalent-blue text-white"
                : "bg-digitalent-gray-light text-digitalent-blue ring-2 ring-digitalent-blue"
            } px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();

              if (singleChoice) {
                isSelected ? setSelectedTags([]) : setSelectedTags([tag]);
                return;
              }

              if (isSelected) {
                setSelectedTags(selectedTags.filter((t) => t !== tag));
                return;
              }

              setSelectedTags([...selectedTags, tag]);
            }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
