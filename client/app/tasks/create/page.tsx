"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { title, description, completed: false });
      router.push("/");
    } catch (error) {
      alert("Failed to create task. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 px-4">
      <form
        onSubmit={handleCreate}
        className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight text-center">
          Create Task
        </h2>

        <label className="block mb-2 font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />

        <label className="block mb-2 font-medium text-gray-700">Description</label>
        <textarea
          className="w-full p-3 mb-7 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
        >
          Create
        </button>
      </form>
    </div>
  );
}
