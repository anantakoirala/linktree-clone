import { Inter, Poppins, Special_Elite } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-specialelite",
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${poppins.variable} ${specialElite.variable}`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
