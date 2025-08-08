import { useState } from 'react';

export default function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await fetch('http://10.42.12.43:8080/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title:text }),
      });

      const newTodo = await res.json();
      onAddTodo(newTodo);
      setText('');
    } catch (err) {
      console.error('Erreur lors de l’ajout :', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nouvelle tâche"
        className="flex-grow p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ajouter
      </button>
    </form>
  );
}
