import L from "leaflet";
import {createElement} from "react";
import {createRoot} from "react-dom/client";
import {renderToString} from "react-dom/server";

import SchoolIcon from "@mui/icons-material/School";

function getIconAsBase64(icon) {
    // Renderiza el icono de MUI a un string SVG
    const svgString = renderToString(createElement(icon));

    // Limpia el SVG eliminando atributos innecesarios
    const cleanedSvg = svgString
        .replace(/fill=".*?"/, 'fill="red"') // Cambia el color si quieres
        .replace(/width=".*?"/, 'width="30"') // Ajusta tamaño
        .replace(/height=".*?"/, 'height="30"');

    // Convierte el SVG en Base64
    const base64Svg = btoa(cleanedSvg);
    return `data:image/svg+xml;base64,${base64Svg}`;
}

export function createMUIIcon(
    icon,
    {color = "grey", backgroundColor = "white", size = 24}
) {
    /* console.log({icon}, {SchoolIcon});
    const school = SchoolIcon;
    const svgString = renderToString(createElement(icon));
    console.log({svgString}); */

    const div = document.createElement("div");
    div.style.fontSize = "10px";
    div.style.color = color;
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.backgroundColor = backgroundColor;
    div.style.borderRadius = "50%";
    div.style.boxShadow = "0px 0px 5px rgba(0,0,0,0.5)";

    // Renderizamos el icono de MUI dentro del div
    const root = createRoot(div);
    root.render(icon);

    return L.divIcon({
        html: div,
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
    });
}

export function createIcon(
    icon,
    {color = "grey", backgroundColor = "white", size = 24}
) {
    return L.icon({
        iconUrl: icon,
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
    });
}
