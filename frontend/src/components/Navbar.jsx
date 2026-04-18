import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '16px' }}>
        Products
      </Link>
      <Link to="/cart">
        Cart
      </Link>
    </nav>
  );
}

export default Navbar;