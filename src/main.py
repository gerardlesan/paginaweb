from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/howls", StaticFiles(directory="howls/howls.html", html=True))
app.mount("/silentvoice", StaticFiles(directory="silentvoice/silentvoice", html=True))

app.mount("/",StaticFiles(directory="howls/howls.html",html=True))
