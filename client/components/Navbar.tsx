"use client";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

export default function Navbar() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1
        className="text-2xl font-bold text-indigo-600 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Task Manager
      </h1>
      <div>
        {auth.isAuthenticated ? (
          <>
            <span className="mr-4 text-gray-700 font-medium">
              Hi, {auth.username}
            </span>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => {
                dispatch(logout());
                router.push("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/login")}
              className="text-indigo-600 hover:underline font-semibold mr-4"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="text-indigo-600 hover:underline font-semibold"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
