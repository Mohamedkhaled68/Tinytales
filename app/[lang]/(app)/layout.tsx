import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="app-layout">
            <Navbar/>
            <div className="min-h-screen flex flex-col">{children}</div>
            <Footer />
        </div>
    );
}
