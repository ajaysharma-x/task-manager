"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight text-center">
          Register
        </h2>

        <label className="block mb-2 font-medium text-gray-700">Username</label>
        <input
          type="text"
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-3 mb-7 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
        >
          Register
        </button>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-indigo-700 hover:underline font-semibold"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
