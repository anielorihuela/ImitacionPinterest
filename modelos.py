from pydantic import BaseModel, Field
from typing import Optional

class UsuarioCrear(BaseModel):
    nombre_usuario: str = Field(min_length=5, max_length=200)
    contrasena: str = Field(min_length=3, max_length=30)

class UsuarioRespuesta(BaseModel):
    id_usuario: str
    nombre_usuario: str

class UsuarioActualizar(BaseModel):
    nombre_usuario: Optional[str] = Field(default=None, min_length=5, max_length=200)
    contrasena: Optional[str] = Field(default=None, min_length=3, max_length=30)

class PostCrear(BaseModel):
    descripcion: Optional[str] = Field(default=None, max_length=500)
    imagen_url: str = Field(max_length=700)

class PostRespuesta(BaseModel):
    id_post: str
    descripcion: Optional[str]
    imagen_url: str
    nombre_usuario: str

class PostActualizar(BaseModel):
    descripcion: Optional[str] = Field(default=None, max_length=500)
    
class ComentarioCrear(BaseModel):
    contenido: str = Field(max_length=900)
    #id post se obtiene del header

class ComentarioRespuesta(BaseModel):
    id_comentario: str 
    contenido: str
    id_post: str
    nombre_usuario: str

class TableroCrear(BaseModel):
    nombre_tablero: str = Field(max_length=200)

class TableroRespuesta(BaseModel):
    id_tablero: str
    nombre_tablero: str
    nombre_usuario: str
    posts: Optional[list[str]] = None

class TableroActualizar(BaseModel):
    nombre_tablero: Optional[str] = Field(default=None, max_length=200)
    post_id: str