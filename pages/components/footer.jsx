

const Footer = ({ year = new Date().getFullYear() }) => {
  return (
    <footer style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid #ccc' }}>
      <p>© {year} Mon Site. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;