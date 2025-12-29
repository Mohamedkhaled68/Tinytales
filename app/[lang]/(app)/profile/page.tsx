// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { apiRequest } from "@/lib/api";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { getToken } from "@/lib/token";

// interface User {
//     id?: number;
//     name: string;
//     email: string;
//     mobile: string;
//     mobile_country_code?: string;
// }

// export default function page() {
//     const router = useRouter();
//     const [user, setUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const token = getToken();

//                 if (!token) {
//                     router.push("/login");
//                     return;
//                 }

//                 // Try to fetch user data from the API
//                 const response = await apiRequest("/auth/user-data", {
//                     method: "GET",
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (response.status_code === 200 && response.data) {
//                     setUser(response.data);
//                     localStorage.setItem("user", JSON.stringify(response.data));
//                 } else {
//                     const userData = localStorage.getItem("user");
//                     if (userData) {
//                         setUser(JSON.parse(userData));
//                     } else {
//                         throw new Error("No user data available");
//                     }
//                 }
//             } catch (err: any) {
//                 console.error("Error fetching user data:", err);

//                 const userData = localStorage.getItem("user");
//                 if (userData) {
//                     setUser(JSON.parse(userData));
//                 } else {
//                     setError(err.message || "Failed to load user data");
//                     toast.error(
//                         err.message || "Session expired. Please log in again."
//                     );
//                     document.cookie =
//                         "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//                     localStorage.removeItem("user");
//                     router.push("/login");
//                 }
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchUserData();
//     }, [router]);

//     const handleLogout = async () => {
//         const token = getToken();

//         try {
//             await apiRequest("/auth/logout", {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//         } catch (err: any) {
//             console.error("Logout error:", err.message);
//         } finally {
//             // Clear local data regardless of API response
//             localStorage.removeItem("user");
//             document.cookie =
//                 "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//             router.push("/");
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-tiny-pink"></div>
//                     <p className="mt-4 text-gray-600">Loading...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center px-4">
//                 <div className="text-center">
//                     <p className="text-red-600 mb-4">{error}</p>
//                     <Link
//                         href="/login"
//                         className="text-tiny-pink hover:underline"
//                     >
//                         Go to Login
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     if (!user) {
//         return null;
//     }

//     return (
//         <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
//             <div className="w-full max-w-md">
//                 <div className="bg-white rounded-2xl shadow-xl p-8">
//                     <div className="text-center mb-8">
//                         <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
//                             <svg
//                                 className="w-10 h-10 text-blue-600"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                                 />
//                             </svg>
//                         </div>
//                         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                             Welcome Back!
//                         </h1>
//                         <p className="text-gray-600">
//                             Here's your account information
//                         </p>
//                     </div>

//                     <div className="space-y-4">
//                         <div className="bg-gray-50 rounded-lg p-4">
//                             <p className="text-xs font-medium text-gray-500 uppercase mb-1">
//                                 Name
//                             </p>
//                             <p className="text-lg font-semibold text-gray-900">
//                                 {user.name}
//                             </p>
//                         </div>

//                         <div className="bg-gray-50 rounded-lg p-4">
//                             <p className="text-xs font-medium text-gray-500 uppercase mb-1">
//                                 Email
//                             </p>
//                             <p className="text-lg font-semibold text-gray-900">
//                                 {user.email}
//                             </p>
//                         </div>

//                         <div className="bg-gray-50 rounded-lg p-4">
//                             <p className="text-xs font-medium text-gray-500 uppercase mb-1">
//                                 Mobile
//                             </p>
//                             <p className="text-lg font-semibold text-gray-900">
//                                 {user.mobile_country_code &&
//                                     `${user.mobile_country_code} `}
//                                 {user.mobile}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex flex-col items-center gap-2">
//                         <button
//                             onClick={handleLogout}
//                             className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
//                         >
//                             Logout
//                         </button>
//                         <Link
//                             href={"/"}
//                             className="w-full text-center mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
//                         >
//                             Home
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { redirect } from "next/navigation";

export default function page() {
    redirect("/profile/general-settings");
}
