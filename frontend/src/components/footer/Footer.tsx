import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: '100%',
          padding: 20,
          minHeight: '20vh',
          maxHeight: '30vh',
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: '30px', textAlign: 'center', padding: '20px' }}>
          Built with love , by
          <span>
            <Link
              target='_blank'
              className='nav-link-footer'
              to={'https://www.instagram.com/teq.arine'}
            >
              TeqArine
            </Link>
          </span>
          ♥
        </p>
      </div>
    </footer>
  );
};

export default Footer;
