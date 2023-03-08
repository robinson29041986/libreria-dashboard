import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../assets/index.css';
import Logo from '../assets/logo.png'

import axios from '../api/axios';
const LOGIN_URL = '/login';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();;
  const from = location.state?.from?.pathname || "/";
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');

  /* Mensaje de error */
  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  /* Funcion del envío del formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          withCredentials: false
        }
      );

      /* Recibimos el token */
      console.log(JSON.stringify(response?.data));
      const token = response?.data?.token;

      /* Parámetros de autenticación */
      setAuth({ email, password, token });
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });

    } catch (error) {
      if (!error?.response) {
        setErrMsg('El servidor no responde.');
      } else if (error.response?.status === 400) {
        setErrMsg('El correo o la contraseña no son válidos.');
      } else if (error.response?.status === 401) {
        setErrMsg('No autorizado');
      } else {
        setErrMsg('Inicio de sesión fallido');
      }
      errRef.current.focus();
    }
  }

  return (
    <section className="login">
      <div className="login_wrapper container">
        <div className="login_logo">
          <Link to="/">
            <img src={Logo} alt="Logo"></img>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="login_form">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            /* autoComplete="none" */
            placeholder="Correo eléctronico"
            id="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            required
          />
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
          <Link to="/register">Crear cuenta</Link>
        </form>
      </div>
    </section>
  );
}

export default Login;