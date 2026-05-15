from pydantic import BaseModel, Field
from typing import Optional

class UsuarioCrear(BaseModel):
    nombre_usuario: str = Field(min_length=5, max_length=200, description="Nombre de usuario")
    contrasena: str = Field(min_length=3, max_length=30, description="Contraseña del usuario")

class UsuarioRespuesta(BaseModel):
    id_usuario: str
    nombre_usuario: str = Field(min_length=5, max_length=200, description="Nombre de usuario")

    class Config:
        from_attributes = True

class UsuarioActualizar(BaseModel):
    nombre_usuario: Optional[str] = Field(default=None, min_length=5, max_length=200, description="Nombre de usuario")
    contrasena: Optional[str] = Field(default=None, min_length=3, max_length=30, description="Contraseña del usuario")

class PostCrear(BaseModel):
    descripcion: Optional[str] = Field(default=None, max_length=500, description="Descripción del post")
    imagen_url: str = Field(max_length=700, description="URL de la imagen del post")

class PostRespuesta(BaseModel):
    id_post: str
    descripcion: Optional[str]
    imagen_url: str
    nombre_usuario: str= Field(min_length=5, max_length=200, description="Nombre de usuario")

    class Config:
        from_attributes = True
        
class ComentarioCrear(BaseModel):
    contenido: str = Field(max_length=900, description="Contenido del comentario")
    id_post: str = Field(max_length=36, description="ID del post al que pertenece el comentario")
    nombre_usuario: str= Field(min_length=5, max_length=200, description="Nombre de usuario")

class ComentarioRespuesta(BaseModel):
    id_comentario: str 
    contenido: str
    id_post: str
    nombre_usuario: str= Field(min_length=5, max_length=200, description="Nombre de usuario")

    class Config:
        from_attributes = True
        
class TableroCrear(BaseModel):
    nombre_tablero: str = Field(max_length=200, description="Nombre del tablero")
    nombre_usuario: str= Field(min_length=5, max_length=200, description="Nombre de usuario")
    posts: Optional[list[str]] = None
    
class TableroRespuesta(BaseModel):
    id_tablero: str
    nombre_tablero: str
    nombre_usuario: str= Field(min_length=5, max_length=200, description="Nombre de usuario")
    posts: Optional[list[str]]= None
    
    class Config:
        from_attributes = True

class TableroActualizar(BaseModel):
    nombre_tablero: Optional[str] = Field(default=None, max_length=200, description="Nombre del tablero")
    post_id: str
    



