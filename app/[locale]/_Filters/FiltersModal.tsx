"use client";
import { Dispatch, SetStateAction, useCallback } from "react";
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
import { Modal, Accordion, RangeSlider } from "@/components";
import TagsFilter from "./FiltersModalTagsFilter";
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

  const isAccordionOpen = useCallback(
    (filterName: ActiveFilterName): boolean => {
      return openFilterName === filterName;
    },
    [openFilterName]
  );

  const closeModal = useCallback(() => {
    setActiveFilters(initialActiveFilters); // Reset active filters
    setOpenFilterName("none");
    setIsModalOpen(false);
  }, [
    initialActiveFilters,
    setOpenFilterName,
    setIsModalOpen,
    setActiveFilters,
  ]);

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
          dict={{
            Regions: dict["Regions"],
            "Whole Switzerland": dict["Whole Switzerland"],
          }}
          locale={locale}
        />
      );

    case "careerFields":
      return (
        <Accordion
          labelTag={activeFilters?.["careerFields"]?.length}
          title={dict["Career Fields"]}
          isOpen={isAccordionOpen("careerFields")}
          key={"careerFields"}
        >
          <TagsFilter
            filterName="careerFields"
            key="careerFields"
            activeFilters={activeFilters}
            filters={filters}
            setActiveFilter={setActiveFilter}
          />
        </Accordion>
      );

    case "technologies":
      return (
        <Accordion
          labelTag={activeFilters?.["technologies"]?.length}
          title={dict["Technologies"]}
          isOpen={isAccordionOpen("technologies")}
          key={"technologies"}
        >
          <TagsFilter
            filterName="technologies"
            key="technologies"
            activeFilters={activeFilters}
            filters={filters}
            setActiveFilter={setActiveFilter}
          />
        </Accordion>
      );

    case "jobLevels":
      return (
        <Accordion
          labelTag={activeFilters?.["jobLevels"]?.length}
          title={dict["Job Levels"]}
          isOpen={isAccordionOpen("jobLevels")}
          key={"jobLevels"}
        >
          <TagsFilter
            filterName="jobLevels"
            key="jobLevels"
            activeFilters={activeFilters}
            filters={filters}
            setActiveFilter={setActiveFilter}
          />
        </Accordion>
      );

    case "salary":
      return (
        <Accordion
          labelTag={activeFilters?.salary && activeFilters?.salary + " CHF"}
          key="salary"
          title={dict["Salary"]}
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
          title={dict["Workload"]}
          isOpen={isAccordionOpen("workload")}
        >
          <RangeSlider
            value={activeFilters?.workload || [0, 100]}
            onValueChange={(workload) => setActiveFilter("workload", workload)}
            min={0}
            max={100}
            step={10}
            name={dict["Workload range"]}
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

    case "industries":
      return (
        <Accordion
          labelTag={activeFilters?.["industries"]?.length}
          title={dict["Industries"]}
          isOpen={isAccordionOpen("industries")}
          key={"industries"}
        >
          <TagsFilter
            filterName="industries"
            key="industries"
            activeFilters={activeFilters}
            filters={filters}
            setActiveFilter={setActiveFilter}
          />
        </Accordion>
      );

    case "companySizes":
      return (
        <Accordion
          labelTag={activeFilters?.["companySizes"]?.length}
          title={dict["Company Sizes"]}
          isOpen={isAccordionOpen("companySizes")}
          key={"companySizes"}
        >
          <TagsFilter
            filterName="companySizes"
            key="companySizes"
            activeFilters={activeFilters}
            filters={filters}
            setActiveFilter={setActiveFilter}
          />
        </Accordion>
      );

    default:
      return null;
  }
}
