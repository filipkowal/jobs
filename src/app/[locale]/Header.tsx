import Link from "@/components/Link";
import LanguageSelector from "./LanguageSelector";
// import CompareButton from "./CompareButton";
// import { SubscriptionButton } from "./SubscriptionButton";
import Image from "next/image";
import DigitalentLogo from "../../public/logo.png";
import Thumnbail from "../../public/thumbnail.png";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { getCustomBoard } from "utils/server/helpers";
import { Locale } from "../../../i18n-config";

export default async function Header({
  params,
  logo,
}: {
  params: { locale: Locale };
  logo?: string;
}) {
  const customBoard = await getCustomBoard();

  return (
    <header
      id="top"
      className="flex flex-row h-16 bg-digitalent-green justify-between items-center py-3 px-4 sm:px-8 sm:fixed top-0 z-10 w-full"
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
        </Suspense>
        {customBoard.disableCompareView ? null : (
          <Suspense fallback={<Spinner />}>
            <CompareButton params={params} />
          </Suspense>
        )} */}
        <Suspense fallback={<Spinner />}>
          <LanguageSelector params={params} />
        </Suspense>
      </div>
    </header>
  );
}
