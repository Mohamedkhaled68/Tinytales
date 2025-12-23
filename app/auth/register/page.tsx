"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        mobile: "",
        mobile_country_code: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify(form),
            });

            router.push("/auth/verify");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <input
                    name="password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />
                <input
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                />
                <input
                    name="mobile_country_code"
                    placeholder="Country Code"
                    onChange={handleChange}
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                </button>
            </form>
        </div>
    );
}
