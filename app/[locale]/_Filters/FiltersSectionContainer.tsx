import { type Filters } from "@/utils";
import { type Locale } from "@/i18n-config";
import { getCustomBoard, getDictionary } from "@/utils/server";
import FiltersSection from "./FiltersSection";

export default async function FiltersSectionContainer({
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
    <div className="justify-left">
      <FiltersSection
        dict={dict}
        locale={locale}
        filters={filters}
        customBoard={customBoard}
      />
    </div>
  );
}
