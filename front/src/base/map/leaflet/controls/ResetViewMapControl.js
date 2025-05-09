import {ResetView} from "./resetview";

export function useResetViewMapControl(initialLatLng, initialZoom, otherOptions = {}) {
    const addResetViewMapControl = map => {
        new ResetView({
            position: "topright",
            latlng: initialLatLng,
            zoom: initialZoom,
            title: "Zoom Inicial",
            ...otherOptions,
        }).addTo(map);
    };

    return {addResetViewMapControl};
}
