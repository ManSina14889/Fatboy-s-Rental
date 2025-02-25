import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/auth"; // Import auth logic
import { Link } from 'react-router-dom';  // Add this import at the top

interface StaffLoginProps {
    onStaffLogin: (email: string, password: string) => Promise<void>;
}

const StaffLogin = ({ onStaffLogin }: StaffLoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await onStaffLogin(email, password);
            navigate('/staff-dashboard', { replace: true });
        } catch (error) {
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Staff Login - Fatboy's Rental
                </h2>
                
                {/* 🔹 Error Message */}
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                <label className="block mb-2">Email Address</label>
                <input
                    type="email"
                    placeholder="staff@example.com"
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

                {/* 🔹 Login Button */}
                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Log In as Staff"}
                </button>

                <p className="text-center mt-4">
                    <Link to="/login" className="text-blue-500">Back to User Login</Link>
                </p>
            </form>
        </div>
    );
};

export default StaffLogin;
