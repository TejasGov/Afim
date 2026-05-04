import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/providers/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ΛFIM — Never Lose Context in Long AI Chats",
  description: "ΛFIM captures every AI conversation — decisions, context, and history — so your chats keep building on each other.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
