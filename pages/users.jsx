import { useEffect, useState } from 'react';
import UserCard from './components/UserCard'; 

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState(null);

  const API_URL = 'https://10.42.12.43:8080/user';

  // Récupération des utilisateurs
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const usersArray = Array.isArray(data) ? data : [data];
        setUsers(usersArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur API:', err);
        setLoading(false);
        setError('Erreur lors de la récupération des utilisateurs');
      });
  };

  const handleAddUser = () => {
    if (!newName || !newEmail) {
      setError('Le nom et l\'email sont requis');
      return;
    }

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, email: newEmail }),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setUsers([newUser, ...users]);
        setNewName('');
        setNewEmail('');
        setError(null);
      })
      .catch(() => setError('Erreur lors de l\'ajout de l\'utilisateur'));
  };

  const handleDeleteUser = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error();
        setUsers(users.filter((u) => u._id !== id));
      })
      .catch(() => setError('Erreur lors de la suppression'));
  };

  const handleUpdateUser = (id, data) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(users.map((u) => (u._id === id ? updatedUser : u)));
      })
      .catch(() => setError('Erreur lors de la mise à jour'));
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={styles.container}>
      <h1>Utilisateurs</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Formulaire d'ajout */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nom"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>Ajouter</button>
      </div>

      <div style={styles.grid}>
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onDelete={handleDeleteUser}
            onUpdate={handleUpdateUser}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
  },
  form: {
    marginBottom: '2rem',
    display: 'flex',
    gap: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  },
};
