import Footer from "@/components/Footer";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="app-layout">
            <div className="min-h-screen flex flex-col">{children}</div>
            <Footer />
        </div>
    );
}
