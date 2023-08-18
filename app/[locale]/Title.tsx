import { getCustomBoard, getDictionary } from "../../utils/server";
import { Locale } from "../../i18n-config";

export default async function Title({ locale }: { locale: Locale }) {
  const customBoard = await getCustomBoard();
  const { title: dict } = await getDictionary(locale);

  return (
    <div className="sm:mt-28 md:my-40">
      {customBoard.hideTitle ? null : (
        <h1 className="text-3xl md:text-[3.6rem] font-medium mb-4 font-title leading-snug text-digitalent-blue">
          {dict["title"]}
        </h1>
      )}
      {customBoard.hideSubtitle ? null : (
        <>
          <h2 className="text-lg font-serif font-light text-digitalent-blue">
            {dict["subtitle.1"]}
          </h2>
          <h2 className="text-lg font-serif font-light text-white">
            {dict["subtitle.2"]}
          </h2>
        </>
      )}
    </div>
  );
}

export function TitleSkeleton() {
  return (
    <div className="sm:mt-28 md:my-40 blur-xl animate-pulse min-h:[123.188px]">
      <h1 className="text-3xl md:text-[3.6rem] font-medium mb-4 font-title leading-snug text-digitalent-blue">
        Handverlesene IT Jobs bei TOP Unternehmen
      </h1>
      <h2 className="text-lg font-serif font-light text-digitalent-blue">
        Garantiertes Feedback innert 48 Stunden
      </h2>
    </div>
  );
}
