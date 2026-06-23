import "./globals.css";

import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Roboto, Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "InvestIQ | Розумний трекер фінансів",
  description: "Керуйте своїми інвестиціями та фінансами з InvestIQ.",

  openGraph: {
    title: "InvestIQ - Твій фінансовий лічильник",
    description:
      "Контролюй свій бюджет, аналізуй витрати та досягай фінансових цілей.",
    url: "https://Sokolove-Olexii.github.io/invest-iq",
    siteName: "InvestIQ",
    locale: "uk_UA",
    type: "website",
  },

  keywords: [
    "InvestIQ",
    "investments",
    "tracking",
    "фінанси",
    "бюджет",
    "трекер витрат",
    "доходи",
    "finance",
    "personal finance",
    "financial management",
    "budgeting",
    "wealth management",
    "financial planning",
    "investment analysis",
  ],
};

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" data-scroll-behavior="smooth">
      <body className={`${roboto.variable} ${montserrat.variable}`}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={4}
        />
      </body>
    </html>
  );
}
