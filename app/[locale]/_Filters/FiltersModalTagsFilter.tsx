import { TagOptionGroup } from "@/components";
import { ActiveFilterName, ActiveFilters, Filters } from "@/utils";

export default function TagsFilter({
  filterName,
  activeFilters,
  filters,
  setActiveFilter,
}: {
  filterName: ActiveFilterName;
  activeFilters: ActiveFilters;
  filters: Filters;
  setActiveFilter: (filterName: ActiveFilterName, value: any) => void;
}) {
  return (
    <TagOptionGroup
      tags={filters?.[filterName as keyof Filters] as string[]}
      selectedTags={(activeFilters?.[filterName] as string[]) || []}
      setSelectedTags={(values) => setActiveFilter(filterName, values)}
      singleChoice={false}
    />
  );
}
