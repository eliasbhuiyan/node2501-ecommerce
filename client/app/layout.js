import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexaMart",
  description: "Modern e-commerce storefront UI with dummy data",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-70 [background:radial-gradient(circle_at_20%_15%,rgba(251,146,60,0.18),transparent_38%),radial-gradient(circle_at_80%_25%,rgba(56,189,248,0.13),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(148,163,184,0.12),transparent_40%)]" />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
