import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState, useContext } from "react";
import { StationContext } from "../StationContext";

import Filter from "./Filter";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import ReactDOMServer from 'react-dom/server';
import { WiCelsius, WiBarometer, WiHumidity, WiShowers, WiStrongWind } from "react-icons/wi";

import { Box } from '@chakra-ui/react'

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

export default function Map() {

    const { stations, isLoading }: any = useContext(StationContext)

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1Ijoic2t5eW5layIsImEiOiJjbGdra2VzdGcwZGh0M2txcW1iMXY3cGd3In0.h6dWS0fty3BVslps26h5fA";

        const map = new mapboxgl.Map({
            container: "map", // container ID
            style: "mapbox://styles/mapbox/streets-v12", // style URL
            center: [3, 47], // starting position [lng, lat]
            zoom: 3, // starting zoom
        });

        // Set the map's max bounds.
        map.setMaxBounds([[-1, 41.604462], [3, 45.604462]]);

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());

        if (isLoading == false) {
            // console.log(stations.stations[0].name)

            // Create a new marker.
            stations.stations.map((station: any) => {

                const lastLog = stations?.hourly[station.id] ? new Date( stations?.hourly[station.id][stations?.hourly[station.id].length - 1].dh_utc) : "pas de log"
                let recencyLogData;
                lastLog!= "pas de log" ?  recencyLogData =  Date.now() - lastLog.getTime() : recencyLogData = 86400001
                let colorMarker:string;
                if (recencyLogData < 600000) {
                    colorMarker = '#44AA21'
                } else if (recencyLogData < 10800000) {
                    colorMarker = '#ffe814'
                } else if (recencyLogData < 86400000) {
                    colorMarker = '#FF5F05'
                } else {
                    colorMarker = '#bfbfbf'
                };
                const marker = new mapboxgl.Marker({
                    color: colorMarker
                })
                    .setLngLat([station.longitude, station.latitude])
                    .addTo(map);

                // ON HOVER -> POP UP POP
                marker.getElement().addEventListener('mouseenter', event => {
                    const popup = new mapboxgl.Popup({
                        closeButton: false,
                        closeOnClick: false
                    });
                    let content 
                    colorMarker != '#bfbfbf' ? content = (
                        <div>
                             <h1>Relevé du {stations?.hourly[station.id][stations?.hourly[station.id].length - 1].dh_utc}</h1>
                            <div className="meteoContent">
                                <div>
                                    <div>
                                        <h1>Temperature </h1>
                                        <p className="meteoSubContent"
                                        ><WiCelsius size={20} /> {stations?.hourly[station.id][0].temperature ? stations?.hourly[station.id][0].temperature + " °C" :"Pas de donnée" }</p>
                                    </div>
                                    <div >
                                        <h1>Humidité </h1>
                                        <p className="meteoSubContent"><WiHumidity size={20} /> {stations?.hourly[station.id][0].humidite ?stations?.hourly[station.id][0].humidite + " %" :"Pas de donnée"}</p>
                                    </div>
                                    <div >
                                        <h1>Pluie 1h </h1>
                                        <p className="meteoSubContent"><WiShowers size={20} /> {stations?.hourly[station.id][0].pluie_1h ? stations?.hourly[station.id][0].pluie_1h + "mm":"Pas de donnée"}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h1>Point de rosée </h1>
                                        <p className="meteoSubContent"><WiCelsius size={20} /> {stations?.hourly[station.id][0].point_de_rosee? stations?.hourly[station.id][0].point_de_rosee + " °C" :"Pas de donnée"}</p>
                                    </div>
                                    <div>
                                        <h1>Pression </h1>
                                        <p className="meteoSubContent"><WiBarometer size={20} />    {stations?.hourly[station.id][0].pression? stations?.hourly[station.id][0].pression + " Pa" :"Pas de donnée"}</p>
                                    </div>
                                    <div>
                                        <h1>Vent moyen </h1>
                                        <p className="meteoSubContent"><WiStrongWind size={20} />    {stations?.hourly[station.id][0].vent_moyen? stations?.hourly[station.id][0].vent_moyen + " km/h":"Pas de donnée"}</p>
                                    </div>
                                </div>
                            </div> 
                        </div>

                       
                    ): content = (
                        <p>Aucune donnée météorologique pour cette station n'a été relevée dans les 24h.</p>
                    )
                        popup.setLngLat([station.longitude, station.latitude])
                        .setHTML(ReactDOMServer.renderToString(content))
                        .addTo(map);
                        

                    // ON MOUSELEAVE -> BYE POPUP
                    marker.getElement().addEventListener('mouseleave', event => {

                        map.getCanvas().style.cursor = '';
                        popup.remove();
                    });
                    onmouseenter = (event) => { };
                    onmouseleave = (event) => { };
                })

                // ON CLICK -> DETAIL STATION PAGE
                marker.getElement().addEventListener('click', event => {
                    window.location.href = "/detail/" + station.id;
                });
            });
        }
    }, [isLoading]);

    return (
        <Box id="map" h="100vh" position={"relative"} >
            <Filter />
        </Box>
    )
};


