import { type Locale } from "@/i18n-config";
import Header from "./Header";
import PinnedJobsContextProvider from "./PinnedJobsContextProvider";
import ToastProvider from "@/components/ToastProvider";
import Link from "next/link";
import "../globals.css";
import localFont from "next/font/local";
import { Merriweather } from "next/font/google";
import type { Metadata } from "next";
import CookiePopup from "@/components/CookiePopup";
import { getCustomBoard, getDictionary } from "@/utils/server/helpers";
import GoogleTagManager from '@/components/GoogleTagManager';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export async function generateMetadata(
  props: {
    params: Promise<{ locale: Locale }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.locale);
  const customBoard = await getCustomBoard();

  return {
    ...dict.meta,
    title: customBoard.documentTitle || dict.meta.title,
    icons: "/thumbnail.png",
    robots: {
      index: true, // Allow search engines to index the page
      follow: true, // Allow search engines to follow links on the page
      nocache: false, // Allow search engines to cache the page
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false, // Allow Google to index images on the page
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const stolzl = localFont({
  variable: "--font-stolzl",
  src: [
    { path: "../../public/fonts/Stolzl-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/Stolzl-Medium.ttf", weight: "500" },
  ],
});

const loew = localFont({
  variable: "--font-loew",
  src: "../../public/fonts/Loew-Heavy.otf",
  preload: false,
});

export default async function RootLayout(
  props: {
    params: Promise<{ locale: Locale }>;
    children: React.ReactNode;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const customBoard = await getCustomBoard();
  const dict = await getDictionary(params.locale);
  const colors = customBoard.colors;

  return (
    <html
      lang={params.locale || "en"}
      className={`${merriweather.variable} ${stolzl.variable}`}
    >
      <head>
        <link rel="icon" href="/thumbnail.png" />
        <style>
          {`
            :root {
              --digitalent-white: ${colors["digitalentWhite"] || "white"};
              --digitalent-green: ${
                colors.digitalentGreen.DEFAULT || "#66B573"
              };
              --digitalent-green-light: ${
                colors.digitalentGreen.light || "#D7E4DD"
              };
              --digitalent-gray-light: ${
                colors.digitalentGray.light || "#F2F2F2"
              };
              --digitalent-gray-dark: ${
                colors.digitalentGray.dark || "#131313"
              };
              --digitalent-yellow: ${
                colors.digitalentYellow.DEFAULT || "#E7E248"
              };
              --digitalent-blue: ${colors.digitalentBlue.DEFAULT || "#193B44"};
              --digitalent-mine: ${colors.digitalentMine.DEFAULT || "#363636"};
              --body-bg-color: ${
                colors.background || colors.digitalentGreen.light || "#D7E4DD"
              };
              --body-text-color: ${
                colors.text || colors["digitalentWhite"] || "white"
              };
            }
          `}
        </style>
      </head>
      <body>
        <div className="min-h-screen overflow-y-auto flex flex-col overflow-x-hidden justify-between">
            <ToastProvider />

            <PinnedJobsContextProvider>
              <div>
                <Header params={params} />

                {children}
              </div>
            </PinnedJobsContextProvider>

            {customBoard.hideFooter ? (
              ""
            ) : (
              <footer className={`self-bottom w-screen ${loew.variable}`}>
                <div className="text-center py-2 max-w-screen bg-digitalent-gray-dark font-sans text-[11px]">
                  {dict["powered by"]}
                  <Link href="https://digitalent.community" target="_blank">
                    <span className="font-logo"> DIGITALENT </span>
                  </Link>
                  © 2023
                </div>
              </footer>
            )}
        </div>

          <CookieConsentProvider>
              <CookiePopup dict={dict.cookiePopup} />
              <GoogleTagManager />
          </CookieConsentProvider>
        </body>
    </html>
  );
}
