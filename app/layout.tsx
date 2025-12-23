import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tinytales",
    description: "A tiny tales sharing platform",
    icons: {
        icon: "/images/logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body cz-shortcut-listen="true">{children}</body>
        </html>
    );
}
