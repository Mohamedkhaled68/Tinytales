import AuthLanguageSelector from "@/components/AuthLanguageSelector";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="auth-layout min-h-screen w-full bg-[#FEFEFE] relative flex justify-center items-center overflow-hidden px-3 pt-12 pb-10">
            <AuthLanguageSelector />
            <div className="absolute w-170 h-170 lg:w-200 lg:h-200 bg-[#F9F9F9] shadow-[0_0_220px_-72px_rgba(0,0,0,0.25)] rounded-full flex items-center justify-center">
                <div className="w-120 h-120 lg:w-150 lg:h-150 bg-white shadow-[0_0_76px_-56px_rgba(0,0,0,0.25)] rounded-full" />
            </div>
            {children}
        </div>
    );
}
