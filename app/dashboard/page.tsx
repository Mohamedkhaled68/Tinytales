"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [name, setName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token || !user) {
            router.push("/auth/login");
            return;
        }

        setName(JSON.parse(user).fullName || "User");
    }, []);

    return <h1 style={{ textAlign: "center" }}>Welcome, {name}</h1>;
}
