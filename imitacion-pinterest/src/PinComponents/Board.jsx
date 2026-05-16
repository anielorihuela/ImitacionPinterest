import pinData from '../datos/pines.json';
import pinBoardData from '../datos/boardPin.json';

function Board({id, nombre, nav}) {
  const pinesEnTablero = pinBoardData.filter(bp => bp.tablero_id === id);
  const pines = pinesEnTablero.map(bp => pinData.find(p => p.id === bp.pin_id)).filter(Boolean);

  console.log(`Pines encontrados para el tablero ${nombre} (ID: ${id}):`, pines);
  return (
        <div className='card-container' style={{ cursor: 'pointer' }} onClick={nav}>
        <div key={id} className="card">
          <img src={pines[0]?.url_imagen || '/placeholder.png'} className="card-image" alt={pines[0]?.descripcion || "No disponible"} />
        </div>
        <div className="card-body">
            <h5 className="card-text">{nombre}</h5>
        </div>
        </div>
  );
}

export default Board;