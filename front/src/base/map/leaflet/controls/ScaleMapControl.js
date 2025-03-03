import L from "leaflet";
import "leaflet-graphicscale";
import "leaflet-graphicscale/dist/Leaflet.GraphicScale.min.css";

export function useScaleMapControl() {
    const addScaleMapControl = map => {
        L.control
            .graphicScale({
                updateWhenIdle: true,
                fill: "fill",
                doubleLine: false,
                showSubunits: false,
                position: "bottomright",
            })
            .addTo(map);
    };

    return {addScaleMapControl};
}
