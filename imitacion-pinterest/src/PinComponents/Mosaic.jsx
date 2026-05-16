import Pin from "./PinSingle";
import { Route, BrowserRouter } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Mosaic({pins}) {
    const navigate = useNavigate();
    
    return (
    <div className="cascade-grid">
        {pins.map(pin => 
            <Pin key={pin.id} id={pin.id} descripcion={pin.descripcion} url_imagen={pin.url_imagen} nav={() => navigate(`/pin/${pin.id}`)} />
        )}
    </div>
    )
}

export default Mosaic;