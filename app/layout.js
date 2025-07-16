import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Footer from "./_components/Footer";
import ClientLayoutWrapper from "./_components/ClientLayoutWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KeenEdge AI",
  description: "AI-powered preparation platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${poppins.variable} antialiased bg-[#0f0f1a] text-white min-h-screen flex flex-col`}
        >
          <Toaster />
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
