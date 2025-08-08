import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SigninPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Inscription
      const resRegister = await fetch('https://10.42.12.43:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!resRegister.ok) {
        const { message } = await resRegister.json();
        setError(message || "Erreur lors de l'inscription");
        setLoading(false);
        return;
      }

      // 2. Login automatique après inscription
      const resLogin = await fetch('https://10.42.12.43:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // pour récupérer le cookie httpOnly
        body: JSON.stringify({ email, password }),
      });

      if (!resLogin.ok) {
        const { message } = await resLogin.json();
        setError(message || "Erreur lors de la connexion automatique");
        setLoading(false);
        return;
      }

      // Connexion réussie : rediriger vers /todos
      router.push('/todos');
    } catch (err) {
      setError("Erreur réseau");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Chargement...' : 'S’inscrire'}
        </button>
      </form>
    </div>
  );
}
