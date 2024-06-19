import { Dispatch, SetStateAction } from "react";
import type {
  OpenFilterName,
  Dictionary,
  ActiveFilters,
  FILTER_NAMES,
} from "@/utils";

export default function FilterButton({
  filterName,
  setIsModalOpen,
  setOpenFilterName,
  activeFilters,
  dict,
}: {
  filterName: (typeof FILTER_NAMES)[number];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setOpenFilterName: Dispatch<SetStateAction<OpenFilterName>>;
  activeFilters: ActiveFilters;
  dict: Dictionary["filtersSection"];
}) {
  return (
    <button
      key={filterName}
      onClick={() => {
        setOpenFilterName(
          filterName === "regions" ? "states" : (filterName as OpenFilterName)
        );
        setIsModalOpen(true);
      }}
      className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1 mr-2 mb-2 break-keep inline-block cursor-pointer
                focus:!outline-2 focus:!outline-digitalent-blue focus:!ring-2 focus:!ring-digitalent-blue
                ${
                  activeFilters &&
                  Object.keys(activeFilters).includes(
                    filterName === "regions" ? "states" : filterName
                  ) &&
                  "!bg-digitalent-blue !text-white"
                }`}
    >
      {dict[filterName]}
    </button>
  );
}
