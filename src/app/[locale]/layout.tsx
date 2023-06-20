import { Locale, i18n } from "../../../i18n-config";
import Header from "./Header";
// import CompareContextProvider from "./CompareContextProvider";
// import ToastProvider from "./ToastProvider";
import Link from "next/link";
import "../globals.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import CookiePopup from "@/components/CookiePopup";
import { getCustomBoard, getDictionary } from "utils/server/helpers";

export const metadata: Metadata = {
  title: "Digitalent Jobs",
  description: "Finest jobs selection by digitalent.ch",
  icons: "/thumbnail.png",
  viewport: "width=device-width, initial-scale=1",
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = localFont({
  variable: "--font-merriweather",
  src: [
    { path: "../../../public/fonts/Merriweather-Light.ttf", weight: "300" },
    { path: "../../../public/fonts/Merriweather-Regular.ttf", weight: "400" },
    { path: "../../../public/fonts/Merriweather-Bold.ttf", weight: "700" },
  ],
});

const stolzl = localFont({
  variable: "--font-stolzl",
  src: [
    { path: "../../../public/fonts/Stolzl-Regular.ttf", weight: "400" },
    { path: "../../../public/fonts/Stolzl-Medium.ttf", weight: "500" },
    { path: "../../../public/fonts/Stolzl-Bold.ttf", weight: "700" },
  ],
});

const loew = localFont({
  variable: "--font-loew",
  src: "../../../public/fonts/Loew-Heavy.otf",
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  params,
  children,
}: {
  params: { locale: Locale };
  children: React.ReactNode;
}) {
  const customBoard = await getCustomBoard();
  const dict = await getDictionary(params.locale);

  return (
    <html
      lang={params.locale || "en"}
      className={`${inter.variable} ${merriweather.variable} ${stolzl.variable} ${loew.variable}`}
    >
      <head>
        <title>Digitalent Jobs</title>
        <meta name="description" content="Digitalent jobs" />
        <link rel="icon" href="/thumbnail.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script id="googleAnalytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
        </Script>
      </head>
      <body
        style={{
          ...(customBoard.colors["digitalent-green"].light && {
            background: customBoard.colors["digitalent-green"].light,
          }),
          ...(customBoard.colors.white && { color: customBoard.colors.white }),
        }}
      >
        <div className="min-h-screen overflow-y-auto flex flex-col overflow-x-hidden justify-between">
          {/* <ToastProvider /> */}

          {/* <CompareContextProvider> */}
          <div>
            <Header params={params} />

            {children}
          </div>
          {/* </CompareContextProvider> */}

          {customBoard.hideFooter ? (
            ""
          ) : (
            <footer className="self-bottom w-screen">
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

        <CookiePopup dict={dict.cookiePopup} />
      </body>
    </html>
  );
}
