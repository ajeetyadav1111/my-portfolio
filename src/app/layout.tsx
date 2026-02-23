import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ajeet Yadav — Full Stack Developer",
  description: "Portfolio of Ajeet Yadav, Full Stack Developer specializing in React, Node.js, and modern web technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}