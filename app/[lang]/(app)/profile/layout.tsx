import Link from "next/link";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-5xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            {/* Tabs / Navigation */}
            <nav className="flex gap-6 border-b mb-8">
                <Link href="/profile/general-settings">General Settings</Link>
                <Link href="/profile/address">My Address</Link>
                <Link href="/profile/orders-history">Order History</Link>
            </nav>

            {/* Nested page renders here */}
            <section>{children}</section>
        </div>
    );
}
