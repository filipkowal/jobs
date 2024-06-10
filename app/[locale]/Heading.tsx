import { getCustomBoard, getDictionary } from "@/utils/server";
import { Locale } from "@/i18n-config";
import { type CustomBoard } from "@/utils";

export default async function Heading({ locale }: { locale: Locale }) {
  const customBoard = await getCustomBoard();
  const { header: dict } = await getDictionary(locale);

  return (
    <HeadingContainer
      heading={dict.heading}
      subheading1={dict["subheading.1"]}
      subheading2={dict["subheading.2"]}
      customBoard={customBoard}
    />
  );
}

export function HeadingSkeleton() {
  return (
    <HeadingContainer
      heading="Bereit für eine neue Mission?"
      subheading1="Entdecke ausgewählte Karrieremöglichkeiten in Schweizer Top-Unternehmen!"
      subheading2="Mit garantiertem Feedback innert 2 Tagen"
    />
  );
}

function HeadingContainer({
  heading,
  subheading1,
  subheading2,
  customBoard,
}: {
  heading: string;
  subheading1: string;
  subheading2: string;
  customBoard?: CustomBoard;
}) {
  return (
    <div className="mt-16 sm:mt-28 md:mt-40 mb-10 md:mb-20 mx-6 lg:mx-0">
      {customBoard?.hideHeading ? null : (
        <h1 className="text-3xl md:text-[3.6rem] font-medium mb-2 font-title leading-snug text-digitalent-blue">
          {customBoard?.heading || heading}
        </h1>
      )}
      {customBoard?.hideSubheading ? null : (
        <>
          <h2 className="text-md md:text-2xl font-title text-digitalent-blue">
            {customBoard?.subheading1 || subheading1}
          </h2>
          <h2 className="text-md md:text-2xl font-title text-digitalent-blue font-medium">
            {customBoard?.subheading2 || subheading2}
          </h2>
        </>
      )}
    </div>
  );
}
