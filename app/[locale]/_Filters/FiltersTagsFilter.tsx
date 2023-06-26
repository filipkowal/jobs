import { Accordion, TagOptionGroup } from "../../../components";
import type { Filters, ActiveFilterName, JobsQuery } from "../../../utils";

export default function TagsFilter({
  title,
  filterName,
  filters,
  activeFilters,
  setActiveFilter,
  isAccordionOpen,
  notEmpty,
  singleChoice,
}: {
  title: string;
  filterName: ActiveFilterName;
  filters: Filters;
  activeFilters: JobsQuery;
  setActiveFilter: (filterName: ActiveFilterName, values: any) => void;
  isAccordionOpen: (filterName: ActiveFilterName) => boolean;
  notEmpty: (v: any) => boolean;
  singleChoice?: boolean;
}) {
  const filterValues = filters?.[filterName as keyof Filters];

  return (
    <Accordion
      title={title}
      isOpen={isAccordionOpen(filterName)}
      alwaysOpen={notEmpty(activeFilters?.[filterName])}
    >
      <TagOptionGroup
        tags={filterValues as string[]}
        selectedTags={(activeFilters?.[filterName] as string[]) || []}
        setSelectedTags={(values) => setActiveFilter(filterName, values)}
        singleChoice={singleChoice}
      />
    </Accordion>
  );
}