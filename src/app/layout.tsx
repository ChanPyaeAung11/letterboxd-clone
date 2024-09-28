import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chan's Ltd",
  description: "Movie reviews, community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} font-inter antialiased flex flex-col min-h-screen`}
      >
        <Navbar></Navbar>
        {children}

        <footer className="bg-gray-200 py-4">
          <div className="container mx-auto px-4 text-center text-gray-600">
            © 2024 Letterboxd Clone. All rights def not reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
