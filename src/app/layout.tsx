import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Roboto, Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";

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
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
