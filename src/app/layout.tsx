import type { Metadata } from "next";
import { Providers } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoveStory — Valentine Edition",
  description:
    "A luxurious romantic website celebrating your love story. Perfect for Valentine's Day.",
  keywords: ["love", "valentine", "romantic", "story"],
  openGraph: {
    title: "LoveStory — Valentine Edition",
    description:
      "A luxurious romantic website celebrating your love story.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
