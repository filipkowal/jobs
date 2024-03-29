import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
// import { SubscriptionButton } from "./SubscriptionButton";
import Image from "next/image";
import DigitalentLogo from "../../public/logo.png";
import Thumnbail from "../../public/thumbnail.png";
import { Suspense } from "react";
import Spinner from "../../components/Spinner";
import { getCustomBoard, getDictionary } from "../../utils/server/helpers";
import { type Locale } from "../../i18n-config";
import CompareButton from "./CompareButton";

export default async function Header({
  params,
  logo,
}: {
  params: { locale: Locale };
  logo?: string;
}) {
  const customBoard = await getCustomBoard();
  const dict = await getDictionary(params.locale);

  const bgColor = customBoard?.colors.headerBackground;
  const textColor = customBoard?.colors.headerText;

  return (
    <header
      id="top"
      className="flex flex-row h-16 bg-digitalent-green justify-between items-center py-3 px-4 sm:px-8 sm:fixed top-0 z-30 w-full"
      style={{
        ...(bgColor && { backgroundColor: bgColor }),
        ...(textColor && { color: textColor }),
      }}
    >
      <div>
        {customBoard.hideLogo ? (
          ""
        ) : (
          <Link href={`/${params?.locale}`}>
            <>
              <Image
                src={logo || DigitalentLogo}
                alt="logo"
                width="70"
                height="42.281"
                className="hidden sm:block"
              />
              <Image
                src={logo || Thumnbail}
                alt="logo"
                width="35"
                height="35"
                className="block sm:hidden"
              />
            </>
          </Link>
        )}
      </div>
      <div className="flex flex-row items-center">
        {/* <Suspense fallback={<Spinner />}>
          <SubscriptionButton dark />
        </Suspense> */}
        {customBoard.disableCompareView ? null : (
          <Suspense fallback={<Spinner />}>
            <CompareButton
              params={params}
              dict={{
                Compare: dict.Compare,
                "Go back": dict["Go back"],
                compareButtonHint: dict.compareButtonHint,
              }}
              customBoard={customBoard}
            />
          </Suspense>
        )}
        <Suspense fallback={<Spinner />}>
          <LanguageSelector params={params} color={textColor} />
        </Suspense>
      </div>
    </header>
  );
}
