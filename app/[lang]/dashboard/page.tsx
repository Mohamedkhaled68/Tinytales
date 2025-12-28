"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromCookie } from "@/utils/helpers";
import { apiRequest } from "@/lib/api";
import Link from "next/link";

interface User {
    name: string;
    email: string;
    mobile: string;
    mobile_country_code?: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = getTokenFromCookie();
        const userData = localStorage.getItem("user");

        console.log(userData);
        console.log(token);

        if (!token || !userData) {
            router.push("/auth/login");
            return;
        }

        setUser(JSON.parse(userData));
    }, [router]);

    const handleLogout = async () => {
        const token = getTokenFromCookie();
        localStorage.removeItem("user");
        document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        try {
            await apiRequest("/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            router.push("/");
        } catch (err: any) {
            console.log(err.message);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                            <svg
                                className="w-10 h-10 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-600">
                            Here's your account information
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Name
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                                {user.name}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Email
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                                {user.email}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                Mobile
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                                {user.mobile_country_code &&
                                    `${user.mobile_country_code} `}
                                {user.mobile}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={handleLogout}
                            className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                        <Link
                            href={"/"}
                            className="w-full text-center mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
