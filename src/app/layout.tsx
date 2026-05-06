import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "MoraForesight 4.0 | A Step Beyond Tomorrow",
  description:
    "MoraForesight 4.0 — A futuristic, character-driven inter-school innovation event organized by IEEE Student Branch, University of Moratuwa. Empowering school students aged 16–20 across Sri Lanka.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className={spaceGrotesk.className}>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
