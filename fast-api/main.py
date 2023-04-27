from fastapi import FastAPI
import requests
import json
from datetime import date
from datetime import timedelta
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
responseAFiltered31 = []
idStations = []
urlDataStations = "https://www.infoclimat.fr/opendata/?method=get&format=json&"
origins = [
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

resA = requests.get("https://www.infoclimat.fr/opendata/stations_xhr.php",
                    headers={"Content-Type": "text"})
responseA = json.loads(resA.text)

for i in responseA:
    if i["departement"] == "31":
        idStations.append(i["id"])
        responseAFiltered31.append(i)

for i in idStations:
    urlDataStations += "&stations[]=" + i


yesterday = date.today() - timedelta(days=1)


@app.get("/detail/{id}/")
async def root(id: str, start_date: str = yesterday.strftime("%Y-%m-%d"), end_date: str = date.today(
).strftime("%Y-%m-%d")):
    res = requests.get("https://www.infoclimat.fr/opendata/?method=get&format=json&stations[]=" + id +
                       "&start=" + start_date + "&end=" + end_date + "&token=iGPjOOncS1hhkWCBBxMWiiJRgdZddcg4o6oZV1iqAGQttTip2jNQ", headers={"Content-Type": "text"})
    response = json.loads(res.text)
    return {"data": response}


@app.get("/stations-data")
async def dataStations(id: str | None = None):
    requestStationsData = requests.get(urlDataStations + "&start=" + yesterday.strftime("%Y:%m:%d") + "&end=" + date.today(
    ).strftime("%Y:%m:%d") + "&token=iGPjOOncS1hhkWCBBxMWiiJRgdZddcg4o6oZV1iqAGQttTip2jNQ", headers={"Content-Type": "text"})
    stationsData = json.loads(requestStationsData.text)
    return {"data": stationsData}
