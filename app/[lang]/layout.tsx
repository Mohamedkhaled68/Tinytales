import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

type Params = Promise<{ lang: string }>;

export const metadata: Metadata = {
    title: "Tinytales",
    description: "A tiny tales sharing platform",
    icons: {
        icon: "/images/logo.svg",
    },
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Params;
}>) {
    const { lang } = (await params) as { lang: "en" | "ar" };

    return (
        <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
            <body cz-shortcut-listen="true">
                <LanguageProvider lang={lang}>{children}</LanguageProvider>
                <Toaster position="top-center" reverseOrder={false} />
            </body>
        </html>
    );
}
