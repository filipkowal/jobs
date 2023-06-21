import Link from "next/link";
import Button from "../../../components/Button";
import { Locale, SearchParams } from "../../../utils";
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

  return (
    <div className="flex relative justify-between w-full mt-8">
      {offset > 0 ? (
        <Link
          href={{
            pathname: locale,
            // @fixme add query params
            // query: {
            //   ...searchParams,
            //   offset: offset - limit > 0 ? offset - limit : undefined,
            // },
          }}
        >
          <Button type="primary" name="Previous">
            {dict[`Previous`]}
          </Button>
        </Link>
      ) : (
        <span></span>
      )}

      {length && length - offset > 8 ? (
        <Link
          href={"#top"}
          className="absolute bottom-0 left-[50%] translate-x-[-50%] md:hidden"
        >
          <Button type="primary" name="top">
            <ArrowUpIcon className="h-5 w-5 inline" />
          </Button>
        </Link>
      ) : (
        ""
      )}

      {length && length > offset + limit ? (
        <Link
          href={{
            pathname: locale,
            // query: {
            //   ...searchParams,
            //   offset: offset + limit,
            // },
          }}
        >
          <Button type="primary" name="Next">
            {dict[`Next`]}
          </Button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
