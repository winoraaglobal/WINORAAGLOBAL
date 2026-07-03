import type { Metadata } from "next";
import { Inter, Permanent_Marker, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Overlays from "@/components/Overlays";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const permanentMarker = Permanent_Marker({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-brush" 
});
const montserrat = Montserrat({
  weight: ["700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Winoraa Global",
  description: "Winoraa Global - Events and Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${permanentMarker.variable} ${montserrat.variable} antialiased bg-black text-white overflow-x-hidden`}>
        <CustomCursor />
        <LoadingScreen />
        <SmoothScroll />
        <Navbar />
        <Overlays />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
