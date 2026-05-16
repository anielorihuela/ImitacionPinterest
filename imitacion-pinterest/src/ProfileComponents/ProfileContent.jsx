import PinSingle from "../PinComponents/PinSingle.jsx";
import Board from "../PinComponents/Board.jsx";
import { useNavigate } from "react-router-dom";

function ProfileContent({ user, boards, pins, useState}) {
  const navigate = useNavigate();

  const BOARDS_PER_PAGE = 4;
  const PINS_PER_PAGE = 10;

  const [currentBoardPage, setCurrentBoardPage] = useState(1);
  const [currentPinPage, setCurrentPinPage] = useState(1);

  const totalBoardPages = Math.ceil(boards.length / BOARDS_PER_PAGE);
  const currentBoards = boards.slice((currentBoardPage - 1) * BOARDS_PER_PAGE, currentBoardPage * BOARDS_PER_PAGE);

  const totalPinPages = Math.ceil(pins.length / PINS_PER_PAGE);
  const currentPins = pins.slice((currentPinPage - 1) * PINS_PER_PAGE, currentPinPage * PINS_PER_PAGE);

  return (
    <div className="container py-5">
      <div className="profile-header text-center mb-5">
        <div className="author-avatar mx-auto mb-3">
          {user.nombre_de_usuario.charAt(0).toUpperCase()}
        </div>
        <h1 className="h2 fw-bold mb-2">@{user.nombre_de_usuario}</h1>
        <div className="d-flex justify-content-center gap-3 text-muted small mb-3">
          <span><strong>{boards.length}</strong> Tableros</span>
          <span>•</span>
          <span><strong>{pins.length}</strong> Pines</span>
        </div>
        <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => {
          localStorage.removeItem('user_session');
          navigate('/profile/login');
        }}>
          Cerrar Sesión
        </button>
      </div>

      <hr className="my-5 opacity-25" />

      <section className="mb-5">
        <h3 className="h4 fw-bold mb-4 px-2">Mis Tableros</h3>
          {currentBoards.length === 0 ? (
            <>
            <p className="text-muted">No tienes tableros creados.</p>
            <p className="text-muted">¡Crea uno para empezar a guardar tus pines favoritos!</p>
            </>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-start">
            {currentBoards.map((board) => (
              <Board key={board.id} id={board.id} nombre={board.nombre} nav={() => navigate(`/modboard/${board.id}`)}/>
            ))}
            </div>
          )}

        {totalBoardPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center custom-pagination align-items-center">
              <li className={`page-item ${currentBoardPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentBoardPage(currentBoardPage - 1)}>Anterior</button>
              </li>
              {[...Array(totalBoardPages)].map((_, i) => (
                <li className={`page-item ${currentBoardPage === i + 1 ? 'active' : ''}`} key={i}>
                  <button className="page-link" onClick={() => setCurrentBoardPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentBoardPage === totalBoardPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentBoardPage(currentBoardPage + 1)}>Siguiente</button>
              </li>
            </ul>
          </nav>
        )}
      </section>

      <hr className="my-5 opacity-25" />

      <section className="mb-5">
        <h3 className="h4 fw-bold mb-4 px-2">Mis Pines</h3>
          {currentPins.length === 0 ? (
            <>
            <p className="text-muted">No tienes pines creados.</p>
            <p className="text-muted">¡Empieza a crear tus propios pines!</p>
            </>
          ) : (
            <div className="cascade-grid align-items-center justify-content-start">
              {currentPins.map((pin) => (
                <PinSingle key={pin.id} id={pin.id} descripcion={pin.descripcion} url_imagen={pin.url_imagen} nav={() => navigate(`/modpin/${pin.id}`)}/>
              ))}
            </div>
          )}

        {totalPinPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center custom-pagination">
              <li className={`page-item ${currentPinPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPinPage(currentPinPage - 1)}>Anterior</button>
              </li>
              {[...Array(totalPinPages)].map((_, i) => (
                <li className={`page-item ${currentPinPage === i + 1 ? 'active' : ''}`} key={i}>
                  <button className="page-link" onClick={() => setCurrentPinPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPinPage === totalPinPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPinPage(currentPinPage + 1)}>Siguiente</button>
              </li>
            </ul>
          </nav>
        )}
      </section>
    </div>
  );
};

export default ProfileContent;