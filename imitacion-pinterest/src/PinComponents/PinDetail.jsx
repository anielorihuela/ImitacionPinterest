import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from '../GeneralComponents/Comment.jsx';
import pinesData from '../datos/pines.json';
import userData from '../datos/usuarios.json';
import boardData from '../datos/boards.json';
import commentData from '../datos/comentarios.json';

const PinDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [comentario, setComentario] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    
    //subimos el comentario a la BD, pero como no tenemos, solo lo mostramos en consola
    console.log("Comentario enviado:", comentario);
    alert("¡Comentario enviado! (Simulación, no se guarda realmente)");
    setComentario('');
  }
  const pin = pinesData.find(p => p.id === parseInt(id, 10));
  const usuario = userData.find(u => u.id === parseInt(id, 10)) || "Desconocido";
  const tablero = boardData.find(b => b.id === parseInt(id, 10)) || "Sin tablero asignado";
  const comentarios = commentData.filter(c => c.pin_id === parseInt(id, 10)) || []  ;
  console.log("Pin encontrado:", pin);
  console.log("Usuario encontrado:", usuario);
  console.log("Tablero encontrado:", tablero);
  console.log("Comentarios encontrados:", comentarios);

  if (!pin) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Error 404</h2>
        <p className="text-muted">El pin con ID {id} no pertenece a nuestra colección.</p>
        <button className="btn btn-primary rounded-pill" onClick={() => navigate('/')}>Volver al menú principal</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button className="btn btn-outline-secondary rounded-pill mb-4 px-4 dm-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="detail-card shadow-lg">
        <div className="row g-0">
          <div className="col-12 col-md-6">
            <img 
              src={pin.url_imagen} 
              className="detail-image" 
              alt={pin.descripcion} 
            />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column p-4 p-lg-5">
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="author-info d-flex align-items-center">
                <div className="author-avatar me-2">
                  {usuario.nombre_de_usuario.charAt(0).toUpperCase()}
                </div>
                <span className="fw-bold">{usuario.nombre_de_usuario}</span>
              </div>
              <button className="btn btn-primary px-4 py-2" onClick={() => alert("Aqui pondria una funcion de guardar pin SI TUVIERA UNA")}>Guardar</button>
            </div>

            <div className="pin-content mb-auto">
              <h1 className="h3 fw-bold mb-3">{pin.descripcion}</h1>
              <p className="text-muted">Publicado en el tablero: <strong>{tablero.nombre}</strong></p>
            </div>

            <div className="comments-section mt-4">
              <h5 className="fw-bold mb-3">Comentarios</h5>
              <div className="comments-list mb-3">
                {comentarios.slice(0, 3).map((comentario) => (
                  <Comment 
                    key={comentario.id} 
                    id={comentario.id} 
                    usuario={comentario.usuario} 
                    texto={comentario.texto} 
                  />
                ))}
              </div>
                <form onSubmit={handleSubmit}>
                <div className="rows comment-input-wrapper d-flex align-items-center">
                <input 
                  type="text" 
                  className="col form-control rounded-pill bg-light border-0" 
                  placeholder="Añadir un comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)} 
                />
                
                  <button type="submit" className="col btn comment-btn rounded-pill mb-3 gx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                    </svg>
                </button>
                </div>
                </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;