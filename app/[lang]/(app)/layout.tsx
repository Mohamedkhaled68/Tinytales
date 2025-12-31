import MainPagesHeader from "@/components/MainPagesHeader";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="app-layout">
            <Navbar />
            <MainPagesHeader />
            <div className="min-h-screen flex flex-col">{children}</div>
            <Footer />
        </div>
    );
}
