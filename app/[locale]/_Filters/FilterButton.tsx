import { Dispatch, SetStateAction } from "react";
import { ActiveFilters, allUppercase } from "../../../utils";
import { OpenFilterName } from "./FiltersSection";
import { FiltersModalDict } from "./FiltersModal";

export default function FilterButton({
  filterName,
  setOpenFilterName,
  activeFilters,
  dict,
}: {
  filterName: string;
  setOpenFilterName: Dispatch<SetStateAction<OpenFilterName>>;
  activeFilters: ActiveFilters;
  dict: {
    "Career Fields": string;
    "More...": string;
    Filters: string;
  } & FiltersModalDict;
}) {
  return (
    <span
      key={filterName}
      onClick={() =>
        setOpenFilterName(
          filterName === "regions" ? "states" : (filterName as OpenFilterName)
        )
      }
      className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1 mr-2 mb-2 break-keep inline-block cursor-pointer
                ${
                  activeFilters &&
                  Object.keys(activeFilters).includes(
                    filterName === "regions" ? "states" : filterName
                  ) &&
                  "!bg-digitalent-blue !text-white"
                }`}
    >
      {dict[allUppercase(filterName) as keyof typeof dict]}
    </span>
  );
}
