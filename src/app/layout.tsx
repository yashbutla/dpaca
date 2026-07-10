// src/app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DPACA | District Probation and After Care Association",
  description: "Established in 1942, the Remand Home of Ahilyanagar is a pioneering social service organization dedicated to child care, juvenile rehabilitation, and welfare.",
  metadataBase: new URL("https://dpaca-ahilyanagar.org"), // Placeholder for production SEO
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-soft text-primary-blue font-sans">
        {children}
      </body>
    </html>
  );
}
