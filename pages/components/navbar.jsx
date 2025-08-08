// import Link from 'next/link'
// export default function Navbar() {
//  return (
//  <ul>
//  <li>
//      <Link href="/">Home</Link>
//  </li>
//  <li>
//     <Link href="/about">About Us</Link>
//  </li>
//  <li>
//     <Link href="/users">Users</Link>
//  </li>
//  <li>
//     <Link href="/todos">To-do List !</Link>
// </li>

//  </ul>
//  );
// }
import Link from 'next/link';

export default function Navbar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="container-fluid">
        {/* Liens à gauche */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
          <li className="nav-item me-3">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link href="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link href="/users" className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link href="/todos" className="nav-link">
              To-do List !
            </Link>
          </li>
        </ul>

        {/* Section à droite */}
        <div className="d-flex align-items-center">
          {user ? (
            <span className="me-3">
              Bienvenue, <strong>{user.name}</strong> !
            </span>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link href="/signin" className="btn btn-primary">
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
