import { Dispatch, SetStateAction } from "react";
import { ActiveFilters } from "../../../utils";

export default function FiltersNumberLabel({
  activeFilters,
  setIsModalOpen,
}: {
  activeFilters: ActiveFilters;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}) {
  if (!activeFilters) return null;
  if (Object.keys(activeFilters).length === 0) return null;

  return Object.keys(activeFilters).length ? (
    <span
      onClick={() => {
        setIsModalOpen?.(true);
      }}
      className="absolute -top-2 right-0 sm:!-left-2 cursor-pointer bg-digitalent-green text-white font-title w-5 h-5 flex justify-center items-center rounded-full"
    >
      {Object.keys(activeFilters).length}
    </span>
  ) : null;
}
