import { Inter } from "next/font/google";
import "../assets/styles/globals.scss";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Teste Facilita Jurídico",
  description: "Teste Facilita Jurídico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
