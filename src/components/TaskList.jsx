export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p className="text-gray-600">No tasks yet.</p>;

  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <li key={t._id} className="bg-white rounded-2xl shadow p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={(e) => onToggle(t._id, e.target.checked)}
            />
            <div>
              <p className={`font-medium ${t.completed ? "line-through text-gray-500" : ""}`}>{t.title}</p>
              {t.description && <p className="text-sm text-gray-600">{t.description}</p>}
            </div>
          </div>
          <button onClick={() => onDelete(t._id)} className="text-sm px-3 py-1 rounded-lg border">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
