import {
  allUppercase,
  type ActiveFilterName,
  type Filters,
} from "../../../utils";
import { type Locale } from "../../../i18n-config";
import { getCustomBoard, getDictionary } from "../../../utils/server";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import FilterButtonContainer from "./FilterButtonContainer";
import Link from "next/link";
import FiltersModalContextProvider from "./FiltersModalContext";
import FiltersModal from "./FiltersModal";

interface Salary {
  amount?: number[] | undefined;
  currency?: string | undefined;
  unit?: string | undefined;
}

export function isOfSalaryType(
  value: Salary | any[] | undefined
): value is Salary {
  return (value as Salary).amount !== undefined;
}

export default async function FiltersSection({
  filtersPromise,
  locale,
}: {
  filtersPromise: Promise<Filters>;
  locale: Locale;
}) {
  const filters = await filtersPromise;

  const customBoard = await getCustomBoard();
  const { filtersSection: dict } = await getDictionary(locale);

  return (
    <div className="lg:w-10/12 w-full max-w-[70rem] justify-left">
      <div className="hidden lg:flex flex-row mb-2 gap-2 flex-wrap relative">
        <>
          <FiltersModalContextProvider>
            <FiltersModal
              locale={locale}
              filters={filters}
              customBoard={customBoard}
              dict={dict}
            />
            <FilterButtonContainer filterName="all">
              <AdjustmentsHorizontalIcon className="text-digitalent-blue pr-2 w-8 h-8 cursor-pointer"></AdjustmentsHorizontalIcon>
            </FilterButtonContainer>
            <>
              {Object.keys(filters)
                .slice(0, locale === "fr" ? 5 : 6)
                .map((filterName) =>
                  customBoard.hiddenFilters?.[
                    filterName as keyof typeof customBoard.hiddenFilters
                  ] ? null : (
                    <FilterButtonContainer
                      key={filterName}
                      filterName={
                        filterName === "regions"
                          ? "states"
                          : (filterName as ActiveFilterName)
                      }
                    >
                      <span
                        className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1 mr-2 mb-2 break-keep inline-block cursor-pointer`}
                      >
                        {filterName === "categories"
                          ? dict["Career Fields"]
                          : allUppercase(filterName)}
                      </span>
                    </FilterButtonContainer>
                  )
                )}
            </>
            <FilterButtonContainer filterName="all">
              <span
                className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
              >
                {dict["More..."]}
              </span>
            </FilterButtonContainer>
          </FiltersModalContextProvider>
        </>
      </div>

      <div className="relative lg:hidden w-[fit-content] pl-1">
        <Link href="filters">
          <span
            className={`font-title text-digitalent-blue ring-2 ring-digitalent-blue px-3 py-1  mr-2 mb-2 break-keep inline-block cursor-pointer`}
          >
            {dict["Filters"]}
            <AdjustmentsHorizontalIcon className="ml-2 mb-1 w-6 h-6 inline-block" />
          </span>
        </Link>
      </div>
    </div>
  );
}