import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');

  // On protège toutes les routes qui commencent par /todo (ajuste si besoin)
  if (req.nextUrl.pathname.startsWith('/todos')) {
    if (!token) {
      // Redirige vers /login si pas de token
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      console.log('Redirection vers la page de connexion');
      return NextResponse.redirect(loginUrl);
    }
  }

  // Sinon on continue
  return NextResponse.next();
}

// Indique les routes à appliquer (optionnel si pas global)
export const config = {
  matcher: ['/todos/:path*'], // protège /todo et ses sous-pages
};
