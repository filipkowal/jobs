import { getCustomBoard, getDictionary } from "../../../utils/server";
import { Locale } from "../../../i18n-config";

export default async function Title({ locale }: { locale: Locale }) {
  const customBoard = await getCustomBoard();
  const { title: dict } = await getDictionary(locale);

  return (
    <div className="md:my-40 mb-14 mt-28 text-center">
      {customBoard.hideTitle ? null : (
        <h1 className="text-4xl md:text-[3.6rem] font-medium mb-4 font-title leading-snug text-digitalent-blue">
          {customBoard.title || dict["Finest jobs selection"]}
        </h1>
      )}
      {customBoard.hideSubtitle ? null : (
        <h2 className="text-xl font-serif font-light text-digitalent-blue">
          {customBoard.subtitle || dict["Interview in 24h"]}
        </h2>
      )}
    </div>
  );
}
