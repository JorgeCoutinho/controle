import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";


export const metadata: Metadata = {
  title: "Controle - Seu sistema de gerenciamento",
  description: "Gerencie seus cliente ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
