import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8080/user'; // adapte selon ton backend

  // Charger la liste des users
  const fetchUsers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors du chargement des utilisateurs');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ajouter un user
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
      .then((res) => {
        if (!res.ok) throw new Error('Erreur création');
        return res.json();
      })
      .then((user) => {
        setUsers([user, ...users]);
        setNewName('');
        setNewEmail('');
        setError(null);
      })
      .catch(() => setError('Erreur lors de la création'));
  };

  // Supprimer un user
  const handleDeleteUser = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur suppression');
        setUsers(users.filter((u) => u._id !== id));
      })
      .catch(() => setError('Erreur lors de la suppression'));
  };

  // Mettre à jour un user
  const handleUpdateUser = (id, data) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur mise à jour');
        return res.json();
      })
      .then((updatedUser) => {
        setUsers(users.map((u) => (u._id === id ? updatedUser : u)));
        setError(null);
      })
      .catch(() => setError('Erreur lors de la mise à jour'));
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Liste des utilisateurs</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Nom"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={handleAddUser}>Ajouter</button>
      </div>

      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onDelete={handleDeleteUser}
          onUpdate={handleUpdateUser}
        />
      ))}
    </div>
  );
}
