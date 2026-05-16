import { useState } from 'react'
import { toggleTheme } from '../theme.js';
import { NavLink } from 'react-router-dom';

function Header({nombre_de_usuario = "Visitante"}) {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src="./src/assets/Logo.svg" alt="Logo" style={{ width: "3.5rem", height: "3.5rem"}} className="d-inline-block align-text-top"/>
                    Pinterest 2.0
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                        Home
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/create">
                        Crear
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/discover">
                        Descubrir
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <button onClick={toggleTheme} className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-circle-half" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/>
                        </svg>
                    </button>
                    </li>
                </ul>
                <NavLink className="nav-link pe-5" to="/profile">
                    <span className="me-2">{nombre_de_usuario}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                </NavLink>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header
