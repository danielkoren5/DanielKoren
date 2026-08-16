import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "מוקד — מרכז שליטה ללקוחות",
  description: "מערכת CRM לניהול לקוחות, אוטומציות ובוט וואטסאפ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <body className="font-body min-h-full flex flex-col bg-bg text-fg">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
