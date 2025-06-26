import { ActiveFilters } from "@/utils";

export default function FiltersNumberLabel({
  activeFilters,
  onClick,
}: {
  activeFilters: ActiveFilters;
  onClick?: () => void;
  className?: string;
}) {
  if (!activeFilters) return null;
  if (Object.keys(activeFilters).length === 0) return null;

  return Object.keys(activeFilters).length ? (
    <span
      onClick={onClick}
      className="absolute -top-2 right-0 sm:-left-2! cursor-pointer bg-digitalent-green text-white border border-digitalent-green font-title px-[8px] w-fit rounded-full"
    >
      {Object.keys(activeFilters).length}
    </span>
  ) : null;
}
