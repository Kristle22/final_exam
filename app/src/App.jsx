import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import './crud.css';
import Back from './Components/Back/Back';
import Front from './Components/Front/Front';
import { login, logout, authConfig } from './Functions/auth';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route
          path='/'
          element={
            <Front show='welcome' />
          }
        />
        <Route
          path='/admin'
          element={
            <RequireAuth role='admin'>
              <Back show='admin' />
            </RequireAuth>
          }
        />
        <Route
          path='admin/masters'
          element={
            <RequireAuth role='admin'>
              <Back show='masters' />
            </RequireAuth>
          }
        />
        <Route
          path='/admin/services'
          element={
            <RequireAuth role='admin'>
              <Back show='services' />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

////////////////REQUIRE AUTH////////////
function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios
      .get('http://localhost:3003/login-check?role=' + role, authConfig())
      .then((res) => {
        if ('ok' === res.data.msg) {
          setView(children);
        } else {
          setView(<Navigate to='/login' replace />);
        }
      });
  }, [children, role]);

  return view;
}

//////////////////LOGIN PAGE////////////
function LoginPage() {
  const navigate = useNavigate();

  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');
  const doLogin = () => {
    axios.post('http://localhost:3003/login', { user, pass }).then((res) => {
      localStorage.setItem('username', user);
      if ('ok' === res.data.msg) {
        login(res.data.key);
        navigate('/', { replace: true });
      }
    });
  };
  return (
    <>
      <div className='login'>
        <h2 className='heading'>LOGIN</h2>
        <div className='label'>
          Name:
          <input
            type='text'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className='label'>
          Password:{' '}
          <input
            type='password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button
          onClick={doLogin}>
          Login
        </button>
        <Link
          to='/register'
          className='link'>
          Create Account
        </Link>
      </div>
    </>
  );
}

//////////////////REGISTER PAGE////////////
function RegisterPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  const doRegister = () => {
    axios.post('http://localhost:3003/register', { user, pass, email }).then((res) => {
      if ('ok' === res.data.msg) {
        login(res.data.key);
        navigate('/', { replace: true });
      }
    });
  };
  return (
    <>
      <div className='login'>
        <h2 className='heading'>CREATE ACCOUNT</h2>
        <div className='label'>
          Name:
          <input
            type='text'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className='label'>
          Email:{' '}
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='label'>
          Password:
          <input
            type='password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button
          onClick={doRegister}>
          Register
        </button>
        <Link
          to='/login'
          className='link'>
          Login
        </Link>
      </div>
    </>
  );
}

//////////////LOGOUT PAGE///////////
function LogoutPage() {
  useEffect(() => logout(), []);
  return <Navigate to='/login' replace />;
}

export default App;
