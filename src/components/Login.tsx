import React, { useState } from "react";
import { handleLogin } from "../utils/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleUserLogin = async (email: string, password: string) => {
        const userData = await handleLogin(email, password);
        if (userData) {
            localStorage.setItem("token", userData.token);
            window.location.href = "/dashboard"; // Redirect to dashboard
        } else {
            alert("Invalid email or password");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleUserLogin(email, password);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Welcome to Fatboy's Rental
                </h2>
                <label className="block mb-2">Email Address</label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />

                <label className="block mb-2">Password</label>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
                >
                    Sign In
                </button>

                <p className="text-center mt-4">
                    Not a user? <a href="/signup" className="text-blue-500">Sign up here</a>
                </p>
                <p className="text-center">
                    <a href="/staff-login" className="text-blue-500">Log in as staff</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
