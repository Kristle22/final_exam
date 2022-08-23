import { Link, NavLink } from 'react-router-dom';
import Message from './Message';

function Nav() {
  return (
    <>
      <nav className='nav'>
        <NavLink
          to='/admin/'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Admin
        </NavLink>
        <NavLink
          to='/admin/masters'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Masters
        </NavLink>
        <NavLink
          to='/admin/services'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Services
        </NavLink>
        <Link
          to='/logout'
          className='logout'>
          Logout
        </Link>
      </nav>
      <Message />
    </>
  );
}

export default Nav;
