"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function VerifyPage() {
    const router = useRouter();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const handleVerify = async () => {
        setError("");

        if (code !== "123456") {
            setError("Invalid verification code");
            return;
        }

        try {
            await apiRequest("/verify", {
                method: "POST",
                body: JSON.stringify({ code }),
            });

            router.push("/auth/login");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>Verify Account</h2>

            <input
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleVerify}>Verify</button>
        </div>
    );
}
