import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://moraforesight.lk"),
  title: {
    default: "MoraForesight 4.0 | Fully-Funded School Innovation Bootcamp",
    template: "%s | MoraForesight 4.0",
  },
  description:
    "MoraForesight 4.0 is a fully-funded three-day residential innovation bootcamp for school students under 20, organized by the IEEE Student Branch of the University of Moratuwa.",
  keywords: [
    "MoraForesight",
    "MoraForesight 4.0",
    "IEEE Student Branch",
    "University of Moratuwa",
    "Innovation Event",
    "Sri Lanka",
    "School Students",
    "Residential Bootcamp",
    "AI",
    "Programming",
    "Robotics",
    "IoT",
    "Entrepreneurship",
    "Technology",
    "Future",
  ],
  authors: [{ name: "IEEE Student Branch, University of Moratuwa" }],
  creator: "IEEE Student Branch, University of Moratuwa",
  publisher: "IEEE Student Branch, University of Moratuwa",
  openGraph: {
    title: "MoraForesight 4.0 | Fully-Funded School Innovation Bootcamp",
    description:
      "A fully-funded three-day residential bootcamp for school students under 20, organized by IEEE Student Branch, University of Moratuwa.",
    url: "https://moraforesight.lk",
    siteName: "MoraForesight 4.0",
    images: [
      {
        url: "/coming-soon.png",
        width: 1672,
        height: 941,
        alt: "MoraForesight 4.0 bootcamp artwork",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoraForesight 4.0 | Fully-Funded School Innovation Bootcamp",
    description:
      "A fully-funded three-day residential bootcamp for school students under 20, organized by IEEE Student Branch, University of Moratuwa.",
    images: ["/coming-soon.png"],
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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
