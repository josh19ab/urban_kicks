import { Mukta, Passero_One } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./_components/ClientWrapper";

const mukta = Mukta({ weight: "400", subsets: ["latin"] });
const passeroOne = Passero_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-passero-one",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Passero+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${mukta.className} ${passeroOne.variable}`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
