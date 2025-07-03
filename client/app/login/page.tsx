"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";
import api from "@/utils/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      dispatch(loginSuccess(res.data));
      router.push("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight text-center">
          Login
        </h2>

        <label className="block mb-2 font-medium text-gray-700">Username</label>
        <input
          type="text"
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-3 mb-7 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
        >
          Login
        </button>

        <p className="mt-8 text-center text-gray-600">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="text-indigo-700 hover:underline font-semibold"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
