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
  metadataBase: new URL("https://moraforesight.lk"),
  title: {
    default: "MoraForesight 4.0 | Own The Next Move",
    template: "%s | MoraForesight 4.0",
  },
  description:
    "MoraForesight 4.0 — A futuristic, character-driven inter-school innovation event organized by IEEE Student Branch, University of Moratuwa. Empowering school students aged 16–20 across Sri Lanka.",
  keywords: [
    "MoraForesight",
    "MoraForesight 4.0",
    "IEEE Student Branch",
    "University of Moratuwa",
    "Innovation Event",
    "Sri Lanka",
    "School Students",
    "Technology",
    "Future",
  ],
  authors: [{ name: "IEEE Student Branch, University of Moratuwa" }],
  creator: "IEEE Student Branch, University of Moratuwa",
  publisher: "IEEE Student Branch, University of Moratuwa",
  openGraph: {
    title: "MoraForesight 4.0 | Own The Next Move",
    description:
      "A futuristic, character-driven inter-school innovation event organized by IEEE Student Branch, University of Moratuwa.",
    url: "https://moraforesight.lk",
    siteName: "MoraForesight 4.0",
    images: [
      {
        url: "/opengraph-image.png", // Ensure this image is added to the public folder or app directory
        width: 1200,
        height: 630,
        alt: "MoraForesight 4.0 - Own The Next Move",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoraForesight 4.0 | Own The Next Move",
    description:
      "A futuristic, character-driven inter-school innovation event organized by IEEE Student Branch, University of Moratuwa.",
    images: ["/twitter-image.png"], // Ensure this image is added to the public folder or app directory
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
