import { getCustomBoard, getDictionary } from "../../utils/server";
import { Locale } from "../../i18n-config";
import { type CustomBoard } from "../../utils";

export default async function Title({ locale }: { locale: Locale }) {
  const customBoard = await getCustomBoard();
  const { title: dict } = await getDictionary(locale);

  return (
    <TitleLayout
      title={dict.title}
      subtitle1={dict["subtitle.1"]}
      subtitle2={dict["subtitle.2"]}
      customBoard={customBoard}
    />
  );
}

export function TitleSkeleton() {
  return (
    <TitleLayout
      title="Bereit für eine neue Mission?"
      subtitle1="Entdecke ausgewählte Karrieremöglichkeiten in Schweizer Top-Unternehmen!"
      subtitle2="Mit garantiertem Feedback innert 2 Tagen"
    />
  );
}

function TitleLayout({
  title,
  subtitle1,
  subtitle2,
  customBoard,
}: {
  title: string;
  subtitle1: string;
  subtitle2: string;
  customBoard?: CustomBoard;
}) {
  return (
    <div className="mt-16 sm:mt-28 md:mt-40 mb-10 md:mb-20 mx-6 lg:mx-0">
      {customBoard?.hideTitle ? null : (
        <h1 className="text-3xl md:text-[3.6rem] font-medium mb-2 font-title leading-snug text-digitalent-blue">
          {title}
        </h1>
      )}
      {customBoard?.hideSubtitle ? null : (
        <>
          <h2 className="text-md md:text-2xl font-title text-digitalent-blue">
            {subtitle1}
          </h2>
          <h2 className="text-md md:text-2xl font-title text-digitalent-blue font-medium">
            {subtitle2}
          </h2>
        </>
      )}
    </div>
  );
}
