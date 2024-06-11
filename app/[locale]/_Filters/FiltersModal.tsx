"use client";
import { Dispatch, SetStateAction } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useFilters } from "@/utils/hooks";
import type {
  ActiveFilterName,
  ActiveFilters,
  CustomBoard,
  Filters,
  Locale,
  OpenFilterName,
  Dictionary,
} from "@/utils";
import { FILTER_NAMES } from "@/utils";
import ApplyFiltersButton from "./FiltersModalApplyButton";
import RegionsFilter from "./FiltersModalRegionSection";
import { Modal, Accordion, RangeSlider, TagsInput } from "@/components";
import FiltersClearButton from "./FiltersClearButton";

export default function FiltersModal({
  filters,
  locale,
  dict,
  customBoard,
  isModalOpen,
  openFilterName,
  setIsModalOpen,
  setOpenFilterName,
  initialActiveFilters,
}: {
  filters: Filters;
  locale: Locale;
  dict: Dictionary["filtersSection"];
  customBoard: CustomBoard;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  openFilterName: OpenFilterName;
  setOpenFilterName: Dispatch<SetStateAction<OpenFilterName>>;
  initialActiveFilters: ActiveFilters;
}) {
  const { activeFilters, setActiveFilters, setActiveFilter, isFilterVisible } =
    useFilters(initialActiveFilters, filters, customBoard);

  const isAccordionOpen = (filterName: ActiveFilterName): boolean =>
    openFilterName === filterName;

  const closeModal = () => {
    setActiveFilters(initialActiveFilters); // Reset active filters
    setOpenFilterName("none");
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      setIsOpen={closeModal}
      title={dict["Filters"]}
      footer={
        <div
          className={`mt-6 sm:mt-16 flex justify-between ${
            activeFilters && Object.keys(activeFilters).length === 0
              ? "!justify-end"
              : ""
          }`}
        >
          <FiltersClearButton
            locale={locale}
            activeFilters={activeFilters}
            dict={dict}
            className="!px-[20px] !py-[10px] !uppercase !mb-0"
          />
          <ApplyFiltersButton
            activeFilters={activeFilters}
            setIsModalOpen={setIsModalOpen}
            locale={locale}
            dict={dict}
            customBoard={customBoard}
          />
        </div>
      }
    >
      <div className="sm:pr-[37px] sm:-mr-[37px]">
        {FILTER_NAMES.map((name) =>
          getFilterComponent(
            name,
            isFilterVisible,
            filters,
            activeFilters,
            setActiveFilter,
            isAccordionOpen,
            locale,
            dict
          )
        )}
      </div>
    </Modal>
  );
}

function getFilterComponent(
  filterName: keyof typeof filters,
  isFilterVisible: (filterName: keyof typeof filters) => boolean,
  filters: Filters,
  activeFilters: ActiveFilters,
  setActiveFilter: (filterName: ActiveFilterName, value: any) => void,
  isAccordionOpen: (filterName: ActiveFilterName) => boolean,
  locale: Locale,
  dict: Dictionary["filtersSection"]
) {
  if (!isFilterVisible(filterName)) return null;

  switch (filterName) {
    case "regions":
      return (
        <RegionsFilter
          key="regions"
          regions={filters.regions}
          selectedStates={activeFilters?.states || []}
          isOpen={isAccordionOpen("states")}
          setSelectedStates={(states) => setActiveFilter("states", states)}
          dict={dict}
          locale={locale}
        />
      );

    case "salary":
      return (
        <Accordion
          labelTag={activeFilters?.salary && activeFilters?.salary + " CHF"}
          key="salary"
          title={dict["salary"]}
          isOpen={isAccordionOpen("salary")}
        >
          <RangeSlider
            value={activeFilters?.salary || 0}
            onValueChange={(salary) => setActiveFilter("salary", salary)}
            min={filters?.salary?.amount?.[0] || 0}
            max={filters?.salary?.amount?.[1] || 900000}
            step={1000}
            unit="CHF"
            name={dict["Min. salary"]}
          />
          <div className="flex gap-2 mt-8">
            <CheckIcon width="24" className="w-4" />
            <span className="w-4/5 text-digitalent-blue">
              {dict["We never share this with companies"]}
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            <CheckIcon width="24" className="w-4" />
            <span className="w-4/5 text-digitalent-blue">
              {dict["We only use this to filter out roles and save you time"]}
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            <CheckIcon width="24" className="w-4" />
            <span className="w-4/5 text-digitalent-blue">
              {
                dict[
                  `If you're unsure, we recommend choosing a lower amount so you don't miss out on roles that could be great`
                ]
              }
            </span>
          </div>
        </Accordion>
      );

    case "workload":
      return (
        <Accordion
          labelTag={
            activeFilters?.workload &&
            activeFilters?.workload[0] +
              " - " +
              activeFilters?.workload[1] +
              " %"
          }
          key="workload"
          title={dict["workload"]}
          isOpen={isAccordionOpen("workload")}
        >
          <RangeSlider
            value={activeFilters?.workload || [0, 100]}
            onValueChange={(workload) => setActiveFilter("workload", workload)}
            min={0}
            max={100}
            step={10}
            unit="%"
          />
        </Accordion>
      );

    case "homeOffice":
      return (
        <Accordion
          labelTag={
            activeFilters?.homeOffice && activeFilters?.homeOffice + " %"
          }
          key="homeOffice"
          title={dict["Home Office"]}
          isOpen={isAccordionOpen("homeOffice")}
        >
          <RangeSlider
            value={activeFilters?.homeOffice || 0}
            onValueChange={(homeOffice) =>
              setActiveFilter("homeOffice", homeOffice)
            }
            min={0}
            max={100}
            step={10}
            unit="%"
            name={dict["Min. Home Office"]}
          />
        </Accordion>
      );

    default:
      // All tag filters: "careerFields" | "technologies" | "jobLevels" | "industries" | "companySizes"
      return (
        <Accordion
          labelTag={activeFilters?.[filterName]?.length}
          title={dict[filterName]}
          isOpen={isAccordionOpen(filterName)}
          key={filterName}
        >
          <TagsInput
            selectedTags={activeFilters?.[filterName]}
            tags={filters[filterName]}
            setSelectedTags={(selectedTags) =>
              setActiveFilter(filterName, selectedTags)
            }
          />
        </Accordion>
      );
  }
}
