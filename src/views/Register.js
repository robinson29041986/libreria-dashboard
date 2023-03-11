import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from '../api/axios';
import '../assets/index.css';
import Logo from '../assets/logo.png'

/* Expresiones regulares para la validación */
const NAME_REGEX = /^[A-Za-zÁ-ú-ñ ]{7,255}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9-.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,100}$/;
const REGISTER_URL = '/register';

const Register = () => {
  /* Definiciones a utilizar (hooks)*/
  const errRef = useRef();

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);

  const [card, setCard] = useState('');
  console.log(card);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  /* Validaciones con REGEX */
  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  /* Mensaje de error */
  useEffect(() => {
    setErrMsg('');
  }, [card, name, email, pwd, matchPwd])

  /* Función del envío del formulario */
  const handleSubmit = async (e) => {
    /* Previene el refresh */
    e.preventDefault();
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ card, name, email, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
        }
      );
      console.log(response?.data)
      setSuccess(true);

      /* Limpiamos los datos */
      setName('');
      setCard('');
      setEmail('');
      setPwd('');
      setMatchPwd('');

    } catch (error) {
      if (!error?.response) {
        setErrMsg('El servidor no responde.');
      } else if (error.response?.status === 428) {
        setErrMsg('El registro está deshabilitado');
      } else {
        setErrMsg('Registro fallido.')
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h3>Funciona el registro</h3>
          <p>
            ¡Pare de sufrir!...
          </p>
        </section>
      ) : (
        <section className="register">
          <div className="register_wrapper container">
            <div className="register_logo">
              <Link to="/">
                <img src={Logo} alt="Logo"></img>
              </Link>
            </div>
            <form onSubmit={handleSubmit} className="register_form">
              <p id="namenote" className={name && !validName ? "instructions" : "offscreen"}>
                Escriba su nombre(s) y apellido(s).
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                /* autoComplete="none" */
                placeholder="Nombre completo"
                id="name"
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="namenote"
              />
              <input
                value={card}
                onChange={(e) => setCard(e.target.value)}
                type="number"
                /* autoComplete="none" */
                placeholder="Cedula"
                id="card"
                required
                aria-describedby="cardnote"
              />
              <p id="emailnote" className={email && !validEmail ? "instructions" : "offscreen"}>
                Escriba un correo válido.
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                /* autoComplete="none" */
                placeholder="Correo eléctronico"
                id="email"
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
              />
              <p id="pwdnote" className={pwd && !validPwd ? "instructions" : "offscreen"}>
                La contraseña debe tener mínimo 8 carácteres,
                incluya una mayúscula, uno o más números y algún carácter especial.
              </p>
              <input
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                type="password"
                placeholder="********"
                id="password"
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
              />
              <p id="confirmnote" className={matchPwd && !validMatch ? "instructions" : "offscreen"}>
                Las contraseñas no coinciden.
              </p>
              <input
                id="confirm_pwd"
                type="password"
                placeholder="********"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
              />
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <button type="submit" className="btn btn-primary">Registrarse</button>
              <Link to="/login">Iniciar sesión</Link>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Register;