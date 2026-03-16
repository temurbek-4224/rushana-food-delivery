import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import SessionProvider from "@/components/providers/SessionProvider";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rushana — Food Delivery",
  description: "Order food from your favorite local restaurants",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch session once server-side — client components skip the extra
  // /api/auth/session round-trip and hydrate instantly.
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <LanguageProvider>
            {children}
            <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#fff",
                color: "#1a1a1a",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
              },
            }}
          />
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
