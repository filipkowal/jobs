import { Dispatch, SetStateAction } from "react";
import { ActiveFilters, capitalize } from "../../../utils";
import type { OpenFilterName } from "../../../utils/types";
import { Dictionary } from "../../../utils/server";

export default function FilterButton({
  filterName,
  setIsModalOpen,
  setOpenFilterName,
  activeFilters,
  dict,
}: {
  filterName: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setOpenFilterName: Dispatch<SetStateAction<OpenFilterName>>;
  activeFilters: ActiveFilters;
  dict: {
    "Career Fields": string;
    "More...": string;
    Filters: string;
  } & Dictionary["filtersSection"];
}) {
  return (
    <span
      key={filterName}
      onClick={() => {
        setOpenFilterName(
          filterName === "regions" ? "states" : (filterName as OpenFilterName)
        );
        setIsModalOpen(true);
      }}
      className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1 mr-2 mb-2 break-keep inline-block cursor-pointer
                ${
                  activeFilters &&
                  Object.keys(activeFilters).includes(
                    filterName === "regions" ? "states" : filterName
                  ) &&
                  "!bg-digitalent-blue !text-white"
                }`}
    >
      {dict[capitalize(filterName) as keyof typeof dict]}
    </span>
  );
}
