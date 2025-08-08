import TodoCard from './TodoCard';

export default function TodoList({ todos, onDeleteTodo }) {
      
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      {todos.map((todo) => (
        <TodoCard key={todo._id} todo={todo} onDelete={onDeleteTodo} />

      ))}
    </div>
  );
}
