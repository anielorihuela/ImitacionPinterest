function Board({id, nombre}) {
  return (
        <div key={id} className="card">
        <div className="card-body">
            <h5 className="card-text pt-3">{nombre}</h5>
        </div>
        </div>
  );
}

export default Board;