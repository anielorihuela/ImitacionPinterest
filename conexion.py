import psycopg
import os
from dotenv import load_dotenv

load_dotenv()
HOST = os.getenv("HOST", "localhost")
PORT = os.getenv("PORT", "5433")
NAME = os.getenv("NAME", "bd_pinterest")
USER = os.getenv("USER", "postgres")
PASSWORD = os.getenv("PASSWORD", "password")

DB_CONNECTION_STRING = f"postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/{NAME}"

with psycopg.connect(DB_CONNECTION_STRING) as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM Usuario;")
        datos = cur.fetchall()
        print(datos)