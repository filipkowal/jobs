import Link from "next/link";
import Button from "../../../components/Button";
import {
  Locale,
  SearchParams,
  pickActiveFiltersFromSearchParams,
} from "../../../utils";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { getDictionary } from "../../../utils/server";

export default async function JobTablePagination({
  offset,
  limit,
  locale,
  length,
  searchParams,
  params,
}: {
  offset: number;
  limit: number;
  locale: Locale;
  length?: number;
  searchParams?: SearchParams;
  params: any;
}) {
  const dict = await getDictionary(locale);

  const pageIndex: number = params?.pageIndex ? parseInt(params.pageIndex) : 0;

  return (
    <div className="flex relative justify-between w-full mt-8">
      {pageIndex > 0 ? <PreviousButton /> : <span></span>}

      {length && length - pageIndex * limit > 8 ? <TopButton /> : ""}

      {length && length > pageIndex * limit + limit ? <NextButton /> : ""}
    </div>
  );

  function PreviousButton() {
    const previousPage = pageIndex - 1;

    return (
      <Link
        href={{
          pathname: `/${locale}${pageIndex > 1 ? `/${previousPage}` : ""}`,
          // @fixme it's not all possible searchParams. Can it be simpler and more generic?
          query:
            searchParams && pickActiveFiltersFromSearchParams(searchParams),
        }}
      >
        <Button type="primary" name="Previous">
          {dict[`Previous`]}
        </Button>
      </Link>
    );
  }

  function TopButton() {
    return (
      <Link
        href={"#top"}
        className="absolute bottom-0 left-[50%] translate-x-[-50%] md:hidden"
      >
        <Button type="primary" name="top">
          <ArrowUpIcon className="h-5 w-5 inline" />
        </Button>
      </Link>
    );
  }

  function NextButton() {
    const nextPage = pageIndex + 1;

    return (
      <Link
        href={{
          pathname: `/${locale}/${nextPage}`,
          // query:
          //   //@fixme: same as above
          //   searchParams && pickActiveFiltersFromSearchParams(searchParams),
        }}
      >
        <Button type="primary" name="Next">
          {dict[`Next`]}
        </Button>
      </Link>
    );
  }
}
