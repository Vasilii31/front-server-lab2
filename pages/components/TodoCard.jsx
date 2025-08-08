export default function TodoCard({ todo, onDelete }) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://10.42.12.43:8080/todo/${todo._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onDelete(todo._id); // Appelle la fonction pour retirer l'élément côté front
      } else {
        console.error('Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur API :', err);
    }
  };

  return (
    <div className="border border-gray-300 rounded p-4 bg-white shadow hover:shadow-md transition">
      <p className="text-gray-800">{todo.text}</p>
      <p className="text-sm text-gray-500 mt-1">ID: {todo._id}</p>
      <p className="text-sm text-gray-500 mt-1">Task: {todo.title}</p>
      <p className="text-sm text-gray-500 mt-1">Created At: {todo.createdAt}</p>

      <button
        onClick={handleDelete}
        className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Supprimer
      </button>
    </div>
  );
}