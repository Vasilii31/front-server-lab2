import { useEffect, useState } from 'react';
import useAuthGuard from '../middlewares/authguard';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function TodosPage() {
  const { loading: authLoading, authenticated } = useAuthGuard();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useAuthGuard();

  useEffect(() => {
    if (!authLoading && authenticated) {
      fetch('https://10.42.12.43:8080/todo', {
        credentials: 'include',
      })
        .then(res => {
          if (!res.ok) throw new Error('Erreur API');
          return res.json();
        })
        .then(data => {
          setTodos(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
    else{
      console.log('Utilisateur non authentifié, redirection vers la page de connexion');
    }
  }, [authLoading, authenticated]);

  if (authLoading || loading) return <p className="text-center mt-10">Chargement...</p>;
  if (!authenticated)
    {
      console.log('Utilisateur non authentifié, redirection vers la page de connexion');
      return null;
    } 

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };
 
  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Ma Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo}/>
    </div>
  );
}