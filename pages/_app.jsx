import "bootstrap/dist/css/bootstrap.min.css";
import "../style/index.css";
import Layout from './components/layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
