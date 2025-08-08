import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-4 mb-6">
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Buy groceries"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Milk, eggs, bread..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="px-4 py-2 rounded-xl bg-black text-white">Add Task</button>
    </form>
  );
}
