from modelos import *
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from dotenv import load_dotenv
from conexion import DB_CONNECTION_STRING
from uuid import UUID, uuid4
app = FastAPI()
if DB_CONNECTION_STRING is " " or None:
    raise ValueError("La variable de entorno DB_CONNECTION_STRING no está definida")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#GET
@app.get("/usuarios")
async def get_usuarios():
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM Usuario;")
            datos = cur.fetchall()
            return datos

@app.get("/posts")
async def get_posts():
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM Post;")
            datos = cur.fetchall()
            return datos
        
@app.get("/comentarios")
async def get_comentarios():
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM Comentario;")
            datos = cur.fetchall()
            return datos

@app.get("/tableros")
async def get_tableros():
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM Tablero;")
            datos = cur.fetchall()
            return datos

@app.get("/postsTablero/{id_tablero}")
async def get_posts_tablero(id_tablero: UUID):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM Post WHERE id_tablero = '%s';", (id_tablero,))
            datos = cur.fetchall()
            return datos

@app.get("/tablerosUsuario/{id_usuario}")
async def get_tableros_usuario(id_usuario: UUID):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM Tablero WHERE id_usuario = '%s';", (id_usuario,))
            datos = cur.fetchall()
            return datos
        
@app.get("/comentariosPost/{id_post}")
async def get_comentarios_post(id_post: UUID):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM Comentario WHERE id_post = '%s';", (id_post,))
            datos = cur.fetchall()
            return datos
        
#POST
@app.post("/usuarios", status_code=201, response_model=UsuarioRespuesta)
async def crear_usuario(usuario: UsuarioCrear):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            id_usuario = str(uuid4())
            cur.execute("INSERT INTO Usuario (id_usuario, nombre_usuario, contrasena) VALUES (%s, %s, %s);", (id_usuario, usuario.nombre_usuario, usuario.contrasena))
            conn.commit()
            return {
                "id_usuario": id_usuario, 
                "nombre_usuario": usuario.nombre_usuario}

@app.post("/posts", status_code=201, response_model=PostRespuesta)
async def crear_post(post: PostCrear, usuario_id: str = Header(...)):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            id_post = str(uuid4())
            cur.execute("INSERT INTO Post (id_post, descripcion, imagen_url, usuario_id) VALUES (%s, %s, %s, %s);", (id_post, post.descripcion, post.imagen_url, usuario_id))
            conn.commit()
            return {
                "id_post": id_post, 
                "descripcion": post.descripcion,
                "imagen_url": post.imagen_url,
                "usuario_id": usuario_id}

@app.post("/posts/{post_id}/comentarios", status_code=201, response_model=ComentarioRespuesta)
async def crear_comentario(comentario: ComentarioCrear, post_id: UUID, usuario_id: str = Header(...)):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            id_comentario = str(uuid4())
            cur.execute("INSERT INTO Comentario (id_comentario, texto, id_post, usuario_id) VALUES (%s, %s, %s, %s);", (id_comentario, comentario.contenido, post_id, usuario_id))
            conn.commit()
            return {
                "id_comentario": id_comentario, 
                "contenido": comentario.contenido,
                "id_post": post_id,
                "nombre_usuario": comentario.nombre_usuario}

@app.post("/tableros", status_code=201, response_model=TableroRespuesta)
async def crear_tablero(tablero: TableroCrear, usuario_id: str = Header(...)):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            id_tablero = str(uuid4())
            cur.execute("INSERT INTO Tablero (id_tablero, nombre, usuario_id) VALUES (%s, %s, %s);", (id_tablero, tablero.nombre_tablero, usuario_id))
            conn.commit()
            return {
                "id_tablero": id_tablero, 
                "nombre_tablero": tablero.nombre_tablero,
                "nombre_usuario": tablero.nombre_usuario,
                "posts":[]
                }
            
# PATCH
@app.patch("/tableros/{tablero_id}", response_model=TableroRespuesta)
async def actualizar_tablero(tablero_id: UUID, tablero: TableroActualizar):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            #primero llenamos la tabla TableroPosts
            cur.execute("INSERT INTO TableroPosts(post_id, tablero_id) VALUES(%s, %s);", (tablero.post_id, tablero_id))
            conn.commit()
            
            #encontramos al usuario y el nombre del tablero
            cur.execute("SELECT nombre_usuario, nombre from Tablero WHERE id = %s;", str(tablero_id))
            res = cur.fetchall()
            if not res:
                raise HTTPException(status_code=404, detail="Registro no encontrado")
            nombre_usuario = res[0][0]
            nombre_tablero = res[0][1]
            #en caso de que lo que se está actualizando es el nombre del tablero
            if tablero.nombre_tablero is not None:
                nombre_tablero = tablero.nombre_tablero
                cur.execute("UPDATE Tablero SET nombre = %s WHERE Tablero.id = %s;",(nombre_tablero, tablero_id))
                conn.commit()
            
            #tenemos que regresar la nueva lista de posts
            posts_tablero = []
            cur.execute("SELECT post_id FROM Post inner join TableroPosts on Post.id = TableroPosts.post_id where TableroPosts.tablero_id = %s;", str(tablero_id))
            posts_tablero = cur.fetchall()
            posts_lista_ret = []
            for post in posts_tablero:
                posts_lista_ret.append(post[0])
            posts_lista_ret.append(tablero.post_id)
            
            return{
                "id_tablero": tablero_id, 
                "nombre_tablero": nombre_tablero,
                "nombre_usuario": nombre_usuario,
                "posts": posts_lista_ret
            }

#DELETE
@app.delete("/usuarios/{usuario_id}", status_code=204)
async def eliminar_usuario(usuario_id: UUID):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM Usuario WHERE id = %s;", str(usuario_id))
            conn.commit()

@app.delete("/posts/{post_id}", status_code=204)
async def eliminar_post(post_id: UUID):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM TableroPosts WHERE post_id = %s;", str(post_id))
            cur.execute("DELETE FROM Post WHERE id = %s;", str(post_id))
            conn.commit()
            
@app.delete("/tableros/{tablero_id}", status_code=204)
async def eliminar_tablero(tablero_id: UUID):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM Tablero WHERE id = %s;", str(tablero_id))
            cur.execute("DELETE FROM TableroPosts WHERE tablero_id = %s;", str(tablero_id))
            conn.commit()

@app.delete("/comentarios/{comentario_id}", status_code=204)
async def eliminar_comentario(comentario_id: UUID):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM Comentario WHERE id = %s;", str(comentario_id))
            conn.commit()
            

