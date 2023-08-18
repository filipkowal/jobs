import { getCustomBoard, getDictionary } from "../../utils/server";
import { Locale } from "../../i18n-config";

export default async function Title({ locale }: { locale: Locale }) {
  const customBoard = await getCustomBoard();
  const { title: dict } = await getDictionary(locale);

  return (
    <div className="sm:mt-28 md:mt-40 md:mb-20">
      {customBoard.hideTitle ? null : (
        <h1 className="text-3xl md:text-[3.6rem] font-medium mb-2 font-title leading-snug text-digitalent-blue">
          {dict["title"]}
        </h1>
      )}
      {customBoard.hideSubtitle ? null : (
        <>
          <h2 className="text-2xl font-title text-digitalent-blue">
            {dict["subtitle.1"]}
          </h2>
          <h2 className="text-2xl font-title text-white">
            {dict["subtitle.2"]}
          </h2>
        </>
      )}
    </div>
  );
}

export function TitleSkeleton() {
  return (
    <div className="sm:mt-28 md:mt-40 md:mb-20 blur-xl animate-pulse min-h:[123.188px]">
      <h1 className="text-3xl md:text-[3.6rem] font-medium mb-2 font-title leading-snug text-digitalent-blue">
        Bereit für eine neue Mission?
      </h1>
      <h2 className="text-2xl font-title text-digitalent-blue">
        Entdecke ausgewählte Karrieremöglichkeiten in Schweizer Top-Unternehmen!
      </h2>
      <h2 className="text-2xl font-title text-white">
        Mit garantiertem Feedback innert 2 Tagen
      </h2>
    </div>
  );
}
