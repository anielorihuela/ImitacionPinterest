import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('pin');
  const [userBoards, setUserBoards] = useState([]);
  const [userSession, setUserSession] = useState(null);

  const [pinLink, setPinLink] = useState('');
  const [pinDescription, setPinDescription] = useState('');
  const [pinImage, setPinImage] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');

  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('user_session');
    if (session) {
      const parsedSession = JSON.parse(session);
      setUserSession(parsedSession);
      setUserBoards(parsedSession.boards || []);
    } else {
      navigate('/profile');
    }
  }, [navigate]);

  const handleCreatePin = (e) => {
    e.preventDefault();

    // Aquí iría la lógica para crear el pin y asociarlo al tablero seleccionado en la BD
    alert(`¡Pin "${pinTitle}" creado con éxito en tu colección!`);
    
    // Resetear formulario y redirigir al perfil para ver los cambios
    setPinTitle('');
    setPinDescription('');
    setPinImage('');
    setSelectedBoard('');
    navigate('/profile');
  };

  const handleCreateBoard = (e) => {
    e.preventDefault();

    // Aquí iría la lógica para crear el tablero en la BD
    alert(`¡Tablero "${boardName}" creado con éxito!`);
    
    setBoardName('');
    setBoardDescription('');
    navigate('/profile');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          
          <div className="d-flex justify-content-center gap-3 mb-5">
            <button 
              className={`btn rounded-pill px-4 fw-bold ${activeTab === 'pin' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab('pin')}
            >
              Crear Pin
            </button>
            <button 
              className={`btn rounded-pill px-4 fw-bold ${activeTab === 'board' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab('board')}
            >
              Crear Tablero
            </button>
          </div>

          <div className="card-container rounded-4 p-4 p-sm-5 shadow-sm">
            {activeTab === 'pin' && (
              <form onSubmit={handleCreatePin}>
                <h3 className="fw-bold mb-4 text-center">Crear un nuevo Pin</h3>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Descripción</label>
                  <textarea 
                    className="form-control rounded-3" 
                    rows="3"
                    placeholder="¿De qué trata este pin?"
                    value={pinDescription}
                    onChange={(e) => setPinDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">URL de la Imagen (Unsplash o Web)</label>
                  <input 
                    type="url" 
                    className="form-control rounded-pill" 
                    placeholder="https://example.com/imagen.jpg"
                    value={pinImage}
                    onChange={(e) => setPinImage(e.target.value)}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold">Guardar en el Tablero</label>
                  <select 
                    className="form-select rounded-pill"
                    value={selectedBoard}
                    onChange={(e) => setSelectedBoard(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un tablero destino</option>
                    {userBoards.map(board => (
                      <option key={board.id} value={board.id.toString()}>{board.nombre}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold">
                  Publicar Pin
                </button>
              </form>
            )}

            {activeTab === 'board' && (
              <form onSubmit={handleCreateBoard}>
                <h3 className="fw-bold mb-4 text-center">Crear un nuevo Tablero</h3>
                
                <div className="mb-3">
                  <label className="form-label small fw-bold">Nombre del Tablero</label>
                  <input 
                    type="text" 
                    className="form-control rounded-pill" 
                    placeholder='Ej. "Circuitos de Control" o "UI Glassmorphism"'
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold">
                  Crear Colección
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Create;