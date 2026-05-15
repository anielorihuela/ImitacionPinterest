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

# GET
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
async def get_posts_tablero(id_tablero: str):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM TableroPosts WHERE tablero_id = %s;", (id_tablero,))
            datos = cur.fetchall()
            return datos

@app.get("/tablerosUsuario/{nombre_usuario}")
async def get_tableros_usuario(nombre_usuario: str):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM Tablero WHERE nombre_de_usuario = %s;", (nombre_usuario,))
            datos = cur.fetchall()
            return datos
        
@app.get("/comentariosPost/{id_post}")
async def get_comentarios_post(id_post: str):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM Comentario WHERE post_id = %s;", (id_post,))
            datos = cur.fetchall()
            return datos
        
# POST
@app.post("/usuarios", status_code=201, response_model=UsuarioRespuesta)
async def crear_usuario(usuario: UsuarioCrear):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            id_usuario = str(uuid4())
            cur.execute("INSERT INTO Usuario (id, nombre_de_usuario, contrasena) VALUES (%s, %s, %s);", (id_usuario, usuario.nombre_usuario, usuario.contrasena))
            conn.commit()
            return {
                "id_usuario": id_usuario, 
                "nombre_usuario": usuario.nombre_usuario
            }

@app.post("/posts", status_code=201, response_model=PostRespuesta)
async def crear_post(post: PostCrear, usuario_id: str = Header(...), nombre_usuario: str = Header(...)):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            id_post = str(uuid4())
            cur.execute("INSERT INTO Post (id, descripcion, url_imagen, usuario_id) VALUES (%s, %s, %s, %s);", (id_post, post.descripcion, post.imagen_url, usuario_id))
            conn.commit()
            return {
                "id_post": id_post, 
                "descripcion": post.descripcion,
                "imagen_url": post.imagen_url,
                "nombre_usuario": nombre_usuario
            }

@app.post("/posts/{post_id}/comentarios", status_code=201, response_model=ComentarioRespuesta)
async def crear_comentario(comentario: ComentarioCrear, post_id: str, usuario_id: str = Header(...), nombre_usuario: str = Header(...)):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            id_comentario = str(uuid4())
            cur.execute("INSERT INTO Comentario (id, texto, post_id, usuario_id) VALUES (%s, %s, %s, %s);", (id_comentario, comentario.contenido, post_id, usuario_id))
            conn.commit()
            return {
                "id_comentario": id_comentario, 
                "contenido": comentario.contenido,
                "id_post": post_id,
                "nombre_usuario": nombre_usuario
            }

@app.post("/tableros", status_code=201, response_model=TableroRespuesta)
async def crear_tablero(tablero: TableroCrear, nombre_usuario: str = Header(...)):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            id_tablero = str(uuid4())
            cur.execute("INSERT INTO Tablero (id, nombre, nombre_de_usuario) VALUES (%s, %s, %s);", (id_tablero, tablero.nombre_tablero, nombre_usuario))
            conn.commit()
            return {
                "id_tablero": id_tablero, 
                "nombre_tablero": tablero.nombre_tablero,
                "nombre_usuario": nombre_usuario,
                "posts": []
            }
            
# PATCH
@app.patch("/posts/{post_id}", response_model=PostRespuesta)
async def actualizar_post(post_id: str, post: PostActualizar, nombre_usuario: str = Header(...)):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            # Actualizamos la descripción del post
            if post.descripcion is not None:
                cur.execute("UPDATE Post SET descripcion = %s WHERE id = %s;", (post.descripcion, post_id))
                conn.commit()
            
            # Obtenemos la información actualizada del post
            cur.execute("SELECT url_imagen FROM Post WHERE id = %s;", (post_id,))
            res = cur.fetchall()
            if not res:
                raise HTTPException(status_code=404, detail="Post no encontrado")
            
            imagen_url = res[0][0]
            
            return {
                "id_post": post_id, 
                "descripcion": post.descripcion,
                "imagen_url": imagen_url,
                "nombre_usuario": nombre_usuario
            }
 
@app.patch("/usarios/{id_usuario}", response_model=UsuarioRespuesta)
async def actualizar_usuario(id_usuario: str, usuario: UsuarioCrear):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            # Actualizamos el nombre de usuario y contraseña
            cur.execute("UPDATE Usuario SET nombre_de_usuario = %s, contrasena = %s WHERE id = %s;", (usuario.nombre_usuario, usuario.contrasena, id_usuario))
            conn.commit()
            
            return {
                "id_usuario": id_usuario, 
                "nombre_usuario": usuario.nombre_usuario
            }          
            
@app.patch("/tableros/{tablero_id}", response_model=TableroRespuesta)
async def actualizar_tablero(tablero_id: str, tablero: TableroActualizar, nombre_usuario: str = Header(...)):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            # Primero agregamos el post al tablero
            cur.execute("INSERT INTO TableroPosts(post_id, tablero_id) VALUES(%s, %s);", (tablero.post_id, tablero_id))
            conn.commit()
            
            # Encontramos el nombre del tablero
            cur.execute("SELECT nombre, nombre_de_usuario FROM Tablero WHERE id = %s;", (tablero_id,))
            res = cur.fetchall()
            if not res:
                raise HTTPException(status_code=404, detail="Tablero no encontrado")
            
            nombre_tablero = res[0][0]
            nombre_usuario_tablero = res[0][1]
            
            # Si se actualiza el nombre del tablero
            if tablero.nombre_tablero is not None:
                nombre_tablero = tablero.nombre_tablero
                cur.execute("UPDATE Tablero SET nombre = %s WHERE id = %s;", (nombre_tablero, tablero_id))
                conn.commit()
            
            # Obtenemos la lista de posts del tablero
            cur.execute("SELECT post_id FROM TableroPosts WHERE tablero_id = %s;", (tablero_id,))
            posts_tablero = cur.fetchall()
            posts_lista_ret = [post[0] for post in posts_tablero]
            
            return {
                "id_tablero": tablero_id, 
                "nombre_tablero": nombre_tablero,
                "nombre_usuario": nombre_usuario_tablero,
                "posts": posts_lista_ret
            }

# DELETE
@app.delete("/usuarios/{id_usuario}", status_code=204)
async def eliminar_usuario(id_usuario: str):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM Usuario WHERE id = %s;", (id_usuario,))
            conn.commit()

@app.delete("/posts/{id_post}", status_code=204)
async def eliminar_post(id_post: str):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM TableroPosts WHERE post_id = %s;", (id_post,))
            cur.execute("DELETE FROM Post WHERE id = %s;", (id_post,))
            conn.commit()
            
@app.delete("/tableros/{id_tablero}", status_code=204)
async def eliminar_tablero(id_tablero: str):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM TableroPosts WHERE tablero_id = %s;", (id_tablero,))
            cur.execute("DELETE FROM Tablero WHERE id = %s;", (id_tablero,))
            conn.commit()

@app.delete("/comentarios/{id_comentario}", status_code=204)
async def eliminar_comentario(id_comentario: str):
    with psycopg.connect(DB_CONNECTION_STRING) as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM Comentario WHERE id = %s;", (id_comentario,))
            conn.commit()
            

