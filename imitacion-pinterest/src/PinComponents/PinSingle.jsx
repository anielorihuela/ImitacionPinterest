import React from 'react';

function Pin({ id, descripcion, url_imagen, nav}) {

  return (
    <>
      <div 
        className="card-container" 
        onClick={nav} 
        style={{ cursor: 'pointer' }}
      >
        <div className="card">
          <img className="card-image" src={url_imagen} alt={descripcion} />
        </div>
        <div className="card-body">
          <p>{descripcion}</p>
        </div>
      </div>
    </>
  );
}

export default Pin;