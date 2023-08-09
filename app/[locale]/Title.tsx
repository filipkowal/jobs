import { getDictionary } from "../../utils/server";
import { getCustomBoard } from "../../utils";
import { Locale } from "../../i18n-config";

export default async function Title({ locale }: { locale: Locale }) {
  const customBoard = await getCustomBoard();
  const { title: dict } = await getDictionary(locale);

  return (
    <div className="my-14 mx-3 sm:mt-28 md:my-40 text-center">
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
    <div className="my-14 mx-3 sm:mt-28 md:my-40 text-center blur-xl animate-pulse min-h:[123.188px]">
      <h1 className="text-3xl md:text-[3.6rem] font-medium mb-4 font-title leading-snug text-digitalent-blue">
        Handverlesene IT Jobs bei TOP Unternehmen
      </h1>
      <h2 className="text-lg font-serif font-light text-digitalent-blue">
        Garantiertes Feedback innert 48 Stunden
      </h2>
    </div>
  );
}
