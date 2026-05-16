function Comment({id, usuario, texto}) {
    return (
        <div className="comment-item mb-2" key={id}>
        <span className="fw-bold me-2">{usuario}</span>
        <span>{texto}</span>
        </div>
    );
}   
export default Comment;