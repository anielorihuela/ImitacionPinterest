import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comment from '../GeneralComponents/Comment.jsx';
import pinesData from '../datos/pines.json';
import userData from '../datos/usuarios.json';
import boardData from '../datos/boards.json';
import boardPin from '../datos/boardPin.json';
import Mosaic from '../PinComponents/Mosaic.jsx';

function Update({type}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState('');
  const [urlImagen, setUrlImagen] = useState('');
  const [tableroId, setTableroId] = useState('');
  const [nombre, setNombre] = useState('');
  const handleSubmitPin = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el pin en la colección del usuario
    const datosActualizados = {
        descripcion: descripcion,
        tableroId: parseInt(tableroId, 10),
        urlImagen: urlImagen
    };

    if (descripcion.trim() !== "") {
        // Solo actualizamos la descripción si el campo no está vacío
    }
    if (tableroId !== "" && tableroId !== tablero.id) {
        // Solo actualizamos el tablero si se ha seleccionado uno diferente al actual
    }
    if (urlImagen !== "" && urlImagen !== pin.url_imagen) {
        // Solo actualizamos la imagen si se ha seleccionado una diferente
    }
    // no haces nada porque no hay cambios
  };
  const handleSubmitBoard = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el tablero en la colección del usuario
    const datosActualizados = {
        nombre: nombre
    };

    if (nombre.trim() !== "") {
        // Solo actualizamos el nombre si el campo no está vacío
    }
    // no haces nada porque no hay cambios
    }
  const userLog = JSON.parse(localStorage.getItem('user_session')) || null;
  let auth = false;

  if (type === "pin") {
    const pin = pinesData.find(p => p.id === parseInt(id, 10));
    const usuario = userData.find(u => u.id === parseInt(pin.usuario_id, 10)) || "Desconocido";
    const userBoards = boardData.filter(b => b.usuario_id === usuario.id);
    const relacion = boardPin.find(bp => bp.pin_id === pin.id);
    const tablero = boardData.find(b => b.id === parseInt(relacion?.tablero_id, 10)) || "Sin tablero asignado";
    console.log("Pin encontrado:", pin);
    console.log("Usuario encontrado:", usuario);
    console.log("Tablero encontrado:", relacion, tablero);

    if (userLog) {
        auth = (pin.usuario_id === userLog.id);
    }
    if (!pin || !auth) {
        return (
        <div className="container py-5 text-center">
            <h2 className="text-danger">Error 404</h2>
            <p className="text-muted">El pin con ID {id} no pertenece a tu colección.</p>
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
                </div>
                <form onSubmit={handleSubmitPin} className="mb-4">
                    <div className="pin-content mb-auto">
                    <label className="form-label small fw-bold">Descripción del pin</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder={pin.descripcion}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <label className="form-label small fw-bold">Link de la imagen:</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder={pin.url_imagen}
                        value={urlImagen}
                        onChange={(e) => setUrlImagen(e.target.value)}
                    />
                    <label className="form-label small fw-bold">Tablero del pin</label>
                    <select className="form-select" value={tableroId} 
                        onChange={(e) => {
                            const valorInstancia = e.target.value;
                            setTableroId(valorInstancia === "" ? "" : parseInt(valorInstancia, 10));
                        }}>
                        <option value="">Selecciona un tablero</option>
                        {userBoards.map(b => (
                            <option key={b.id} value={b.id}>{b.nombre}</option>
                        ))}
                    </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill mt-4">Guardar cambios</button>
                </form>
                <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => {
                    // Aquí iría la lógica para eliminar el pin de la colección del usuario
                    navigate(-1);
                }}>
                Borrar pin
                </button>

            </div>
            </div>
        </div>
        </div>
    );
    }
    else if (type === "board") {
        const board = boardData.find(b => b.id === parseInt(id, 10));
        console.log("Board encontrado:", board);
        const usuario = userData.find(u => u.id === parseInt(board.usuario_id, 10)) || "Desconocido";
        console.log("Usuario encontrado:", usuario);
        const relacion = boardPin.filter(bp => bp.tablero_id === parseInt(id, 10)) || [];
        console.log("Relación encontrada:", relacion);
        const pines = relacion.map(r => pinesData.find(p => p.id === r.pin_id)).filter(Boolean);
        console.log("Pines encontrados:", pines);

        if (userLog) {
            auth = (board.usuario_id === userLog.id);
        }
        if (!board || !auth) {
            return (
            <div className="container py-5 text-center">
                <h2 className="text-danger">Error 404</h2>
                <p className="text-muted">El board con ID {id} no pertenece a tu colección.</p>
                <button className="btn btn-primary rounded-pill" onClick={() => navigate('/')}>Volver al menú principal</button>
            </div>
            );
        }
        return (
            <>
            <div className="container py-5">
            <button className="btn btn-outline-secondary rounded-pill mb-4 px-4 dm-button" onClick={() => navigate(-1)}>
                ← Volver
            </button>

            <div className="detail-card shadow-lg">
                <div className="row g-0">
                <div className="col-12 col-md-6">
                    <img 
                    src={pines[0]?.url_imagen || "/placeholder.png"} 
                    className="detail-image" 
                    alt={"Imagen del tablero"} 
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
                    </div>
                    <form onSubmit={handleSubmitBoard} className="mb-4">
                        <div className="pin-content mb-auto">
                        <label className="form-label small fw-bold">Nombre del tablero</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder={board.nombre}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 rounded-pill mt-4">Guardar cambios</button>
                    </form>
                    <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => {
                        // Aquí iría la lógica para eliminar el tablero de la colección del usuario
                        navigate(-1);
                    }}>
                    Borrar tablero
                    </button>

                </div>
                </div>
            </div>
            </div>
            <Mosaic pins={pines} />
            </>
        );
    }
};

export default Update;