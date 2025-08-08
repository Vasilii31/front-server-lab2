import { useState } from 'react';

export default function UserCard({ user, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    onUpdate(user._id, { name, email });
    setIsEditing(false);
  };

  return (
    <div style={styles.card}>
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleSave}>Sauvegarder</button>
          <button onClick={() => setIsEditing(false)}>Annuler</button>
        </>
      ) : (
        <>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
          <button onClick={() => onDelete(user._id)}>Supprimer</button>
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '6px',
    background: '#f4f4f4',
  },
};
