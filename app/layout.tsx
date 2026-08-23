import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"
import { ClientWrapper } from "./toast-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Toastify",
  description: "Modern toast notifications for React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ClientWrapper
        >
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}