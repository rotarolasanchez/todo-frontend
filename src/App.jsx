import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTasks() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/tasks`);
      const data = await res.json();
      setTasks(data);
      setError("");
    } catch (e) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTasks(); }, []);

  async function addTask(newTask) {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    if (!res.ok) return alert("Failed to create task");
    await fetchTasks();
  }

  async function toggleTask(id, completed) {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) return alert("Failed to update task");
    await fetchTasks();
  }

  async function deleteTask(id) {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("Failed to delete task");
    await fetchTasks();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">To-Do App</h1>
      <TaskForm onAdd={addTask} />
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      )}
    </div>
  );
}
