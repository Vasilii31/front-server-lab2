import Link from 'next/link'
export default function Navbar() {
 return (
 <ul>
 <li>
     <Link href="/">Home</Link>
 </li>
 <li>
    <Link href="/about">About Us</Link>
 </li>
 <li>
    <Link href="/users">Users</Link>
 </li>
 <li>
    <Link href="/todos">To-do List !</Link>
</li>

 </ul>
 );
}