import Navbar from './navbar'
import Footer from './footer'
import useAuthGuard from '../../middlewares/authguard'

export default function Layout({ children }) {
    const { authenticated, user, loading } = useAuthGuard();

 return (
 <>
 <Navbar user={authenticated ? user : null}/>
 <main>{children}</main>
 <Footer />
 </>
 )
}