import Pin from "./PinSingle";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Mosaic({pins}) {
    const navigate = useNavigate();
    useEffect(() => {
        //Aqui tenemos que implementar lo de que baje pines y los guarde en localStorage
    },[]);
    
    return (
    <div className="cascade-grid">
        {pins.map(pin => 
            <Pin key={pin.id} id={pin.id} descripcion={pin.descripcion} url_imagen={pin.url_imagen} nav={() => navigate(`/pin/${pin.id}`)}/>
        )}
    </div>
    )
}

export default Mosaic;