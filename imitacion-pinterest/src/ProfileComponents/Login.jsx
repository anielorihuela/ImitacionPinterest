import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userData from '../datos/usuarios.json';


function Login () {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Se supone que aqui checamos bien si funciono con la BD
    console.log("Intentando iniciar sesión con:", { username, password });
    const usuario = userData.find(u => u.nombre_de_usuario === username.trim()) || "Desconocido";
    console.log("Usuario encontrado:", usuario);

    if (usuario !== "Desconocido" && password === usuario.contrasena) {
        localStorage.setItem('user_session', JSON.stringify({ id: usuario.id, nombre_de_usuario: usuario.nombre_de_usuario }));
        navigate('/profile');
    } else {
        alert("Error: No se pudo iniciar sesión. Verifica tus credenciales e inténtalo de nuevo.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
    <div className="auth-card p-4 p-sm-5 text-center">
      <h2 className="fw-bold mb-3">Te damos la bienvenida</h2>
      <p className="text-muted mb-4 small">Encuentra nuevas ideas para tu próximo proyecto</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-start">
          <label className="form-label small fw-bold">Nombre de usuario</label>
          <input 
            type="text" 
            className="form-control rounded-pill" 
            placeholder="Ej. janesmith" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={200}
            required 
          />
        </div>
        <div className="mb-4 text-start">
          <label className="form-label small fw-bold">Contraseña</label>
          <input 
            type="password" 
            className="form-control rounded-pill" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={30}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 rounded-pill mb-3">
          Iniciar Sesión
        </button>
      </form>
      
      <p className="small mb-0 text-muted">
        ¿No tienes cuenta?{' '}
        <button className="btn btn-link p-0 text-decoration-none fw-bold" onClick={() => navigate('/profile/register')} type="button">
          Regístrate aquí
        </button>
      </p>
    </div>
    </div>
  );
};

export default Login;