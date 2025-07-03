"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTasks, updateTask, deleteTask } from "@/redux/taskSlice";
import api from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    api
      .get("/tasks")
      .then((res) => {
        dispatch(setTasks(res.data));
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
      });
  }, [token, dispatch, router]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Your Tasks</h1>
        <Link href="/tasks/create">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition">
            + New Task
          </button>
        </Link>
      </div>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-20 text-lg">
          No tasks yet! Click "New Task" to get started.
        </p>
      )}

      <div className="space-y-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-xl shadow-lg transition
              ${task.completed
                ? "bg-gray-100 text-gray-500 line-through"
                : "bg-white text-gray-900"
              }
            `}
          >
            <div className="flex items-center space-x-4 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={async () => {
                  try {
                    const res = await api.put(`/tasks/${task._id}`, {
                      completed: !task.completed,
                    });
                    dispatch(updateTask(res.data));
                  } catch (error) {
                    console.error("Error updating task status", error);
                  }
                }}
                className="w-6 h-6 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
              />
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-sm mt-1">{task.description}</p>
              </div>
            </div>

            <div className="flex space-x-3 mt-4 md:mt-0">
              <Link href={`/tasks/edit/${task._id}`}>
  <button
    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold rounded-lg shadow-sm transition"
    aria-label={`Edit task ${task.title}`}
  >
    Edit
  </button>
</Link>

              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-sm transition"
                onClick={async () => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this task?"
                  );
                  if (!confirmDelete) return;

                  try {
                    await api.delete(`/tasks/${task._id}`);
                    dispatch(deleteTask(task._id));
                  } catch (error) {
                    console.error("Failed to delete task", error);
                  }
                }}
                aria-label={`Delete task ${task.title}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
