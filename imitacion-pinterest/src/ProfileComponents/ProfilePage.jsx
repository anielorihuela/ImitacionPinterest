import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login.jsx'
import Register from './Register.jsx'
import ProfileContent from './ProfileContent.jsx'
// Dummy data
import pinesData from '../datos/pines.json';
import userData from '../datos/usuarios.json';
import boardData from '../datos/boards.json';

function ProfilePage() {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(() => {
    const saved = localStorage.getItem('user_session');
    return saved ? JSON.parse(saved) : null;
  });
  const isLoggedIn = !!userSession;
  console.log("Cargando sesión de usuario desde localStorage:", userSession);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/profile/login');
      console.log('Usuario no autenticado');
    }
  }, [isLoggedIn, navigate]);

  const userPin = pinesData.filter(pin => pin.usuario_id === userSession?.id);
  const userBoards = boardData.filter(board => board.usuario_id === userSession?.id);
  console.log("Pines del usuario:", userPin);
  console.log("Tableros del usuario:", userBoards);

  if (isLoggedIn) {
    return (
      <>
        <ProfileContent 
          user={userSession} 
          boards={userBoards}
          pins={userPin}
          useState={useState}
        />
      </>
    );
  }
  else {
    <>
    </>
  }
};

export default ProfilePage;