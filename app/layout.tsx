import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Store Builder",
  description: "منصة ذكاء اصطناعي لبناء محتوى المتاجر العربية"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
