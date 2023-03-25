import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useLogout from "../hooks/useLogout";
import {
  People,
  Cube,
  BarChart,
  Bell,
  Person,
  Settings,
  LogOut,
  ShoppingBag
} from '@easy-eva-icons/react';
import Avatar from '../assets/avatar.png';
import Logo from '../assets/logo.png';

const NavBar = () => {
  /* Función del panel de usuario */
  const [open, setOpen] = useState(false)
  let menuRef = useRef();
  const toggle = () => {
    setOpen(!open)
  }

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  });

  /* Función para cerrar sesión */
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  }


  return (
    <header className="header">
      <div className="header_row container">
        <div className="header_column-left">
          <Link to="/">
            <img src={Logo} alt="Logo" className="header_logo"></img>
          </Link>
          <nav className="header_nav">
            <ul className="header_ul">
              <li className="header_li">
                <NavLink to="/categories" className="header_nav--link"><BarChart className="header_icon header_icon--nav" />Categorias</NavLink>
              </li>
              <li className="header_li">
                <NavLink to="/products" className="header_nav--link"><Cube className="header_icon header_icon--nav" />Productos</NavLink>
              </li>
              <li className="header_li">
                <NavLink to="/users" className="header_nav--link"><People className="header_icon header_icon--nav" />Usuarios</NavLink>
              </li>
              <li className="header_li">
                <NavLink to="/orders" className="header_nav--link"><ShoppingBag className="header_icon header_icon--nav" />Pedidos</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header_column-right">
          <div className="header_notification">
            <NavLink to="/notification">
              <Bell className="header_icon" />
            </NavLink>
            <div className="header_icon--notification"></div>
          </div>
          <div className="header_usernav" ref={menuRef} onClick={toggle}>
            <img className="header_usernav-img" src={Avatar} alt="Avatar"></img>
            <ul className={`header_popup ${open ? 'isActive' : ''}`}>
              <li className="header_popup--li">
                <NavLink to="/profile" className="header_navlink-popup"> <Person className="header_icon" />Perfil</NavLink>
              </li>
              <li className="header_popup--li">
                <NavLink to="/settings" className="header_navlink-popup"> <Settings className="header_icon" />Ajustes</NavLink>
              </li>
              <hr className="header_hr" />
              <li className="header_popup--li">
                <button className="btn_logout" onClick={signOut}><LogOut className="header_icon" />Cerrar Sesion</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;