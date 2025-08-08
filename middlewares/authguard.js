import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// export default function useAuthGuard() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false);

//  useEffect(() => {
//   fetch('https://10.42.12.43:8080/api/auth/me', {
//     credentials: 'include'
//   })
//     .then(res => res.json())
//     .then(data => {
//       if (data.authenticated) {
//         console.log('Utilisateur authentifié');
//         setAuthenticated(true);
//       } else {
//         console.log('Utilisateur non authentifié, redirection vers la page de connexion');
//         setAuthenticated(false);
//         router.replace('/login');
//       }
//       setLoading(false);
//     })
//     .catch(() => {
//       router.replace('/login');
//       console.log('Erreur lors de la vérification de l\'authentification');
//       setAuthenticated(false);
//       setLoading(false);
//     });
// }, [router]);


//   return { loading, authenticated };
// }
export default function useAuthGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);  // <-- nouvel état pour user

  useEffect(() => {
    fetch('https://10.42.12.43:8080/api/auth/me', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          console.log('Utilisateur authentifié');
          setAuthenticated(true);
          console.log('Utilisateur:', data.user);
          setUser(data.user || null);  // <-- on stocke l'user ici
        } else {
          console.log('Utilisateur non authentifié, redirection vers la page de connexion');
          setAuthenticated(false);
          setUser(null);
          router.replace('/login');
        }
        setLoading(false);
      })
      .catch(() => {
        router.replace('/login');
        console.log("Erreur lors de la vérification de l'authentification");
        setAuthenticated(false);
        setUser(null);
        setLoading(false);
      });
  }, [router]);

  return { loading, authenticated, user };
}