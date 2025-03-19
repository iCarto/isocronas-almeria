import L from "leaflet";
import {createElement} from "react";
import {createRoot} from "react-dom/client";
import {renderToString} from "react-dom/server";

export function createMUIIcon(
    icon,
    {color = "grey", backgroundColor = "white", size = 24}
) {
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

function convertColorToRGB(color) {
    if (!color.startsWith("#")) {
        return color;
    }
    color = color.replace(/^#/, "");
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function getIconAsBase64(
    IconComponent,
    color = "grey",
    backgroundColor = "white",
    size = 16,
    paddingFactor = 0.8
) {
    let svgString = renderToString(createElement(IconComponent));

    if (!svgString.includes("xmlns=")) {
        svgString = svgString.replace(
            "<svg",
            '<svg xmlns="http://www.w3.org/2000/svg"'
        );
    }

    // Extraer los <path> y asegurarse de que todos están cerrados correctamente
    let paths = svgString.match(/<path[^>]*\/?>/g)?.join("") || "";
    paths = paths.replace(/fill="[^"]*"/g, ""); // Eliminar cualquier atributo fill existente
    paths = paths.replace(/<path/g, `<path fill="${convertColorToRGB(color)}"`);

    // Asegurar que los <path> estén cerrados correctamente
    paths = paths.replace(/<path([^>]*)>/g, "<path$1/>");

    // Ajuste del padding y centrado
    const scale = (size / 24) * paddingFactor; // Reducir tamaño del icono dentro del círculo
    const translate = (size * (1 - paddingFactor)) / 2; // Centrar el icono con padding

    const finalSvg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${convertColorToRGB(backgroundColor)}" />
        <g transform="translate(${translate}, ${translate}) scale(${scale})">
        ${paths}
        </g>
    </svg>`.replace(/\s{2,}/g, ""); // Eliminar espacios extra

    const base64Svg = btoa(unescape(encodeURIComponent(finalSvg)));
    return `data:image/svg+xml;base64,${base64Svg}`;
}

export function createIcon(
    icon,
    {color = "grey", backgroundColor = "white", size = 24}
) {
    const iconUrl = getIconAsBase64(icon, color, backgroundColor, size);

    return L.icon({
        iconUrl,
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
    });
}
