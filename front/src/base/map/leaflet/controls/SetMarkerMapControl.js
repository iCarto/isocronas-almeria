import {useMapContext} from "base/map";
import L from "leaflet";
import {useEffect, useRef} from "react";

L.SingleMarkerHandler = function (map, options) {
    options = options || {};

    let currentMarker = null;

    // Disable the default double-click zoom
    map.doubleClickZoom.disable();

    const createMarker = latlng => {
        if (currentMarker) {
            map.removeLayer(currentMarker);
            currentMarker = null;
        }

        currentMarker = L.marker(latlng, options.markerOptions);
        currentMarker.addTo(map);
    };

    // Add double-click handler
    const handleDoubleClick = event => {
        createMarker(event.latlng);

        const setSelectedPoint = options.setSelectedPoint;
        if (setSelectedPoint) {
            setSelectedPoint(`${event.latlng.lat},${event.latlng.lng}`);
        }
    };

    // Add the event listener
    map.on("dblclick", handleDoubleClick);

    // Return public API
    return {
        getMarker: function () {
            return currentMarker;
        },

        createMarker: function (selectedPoint) {
            const coordinates = selectedPoint.split(",");
            createMarker({lat: coordinates[0], lng: coordinates[1]});
        },

        getPosition: function () {
            return currentMarker ? currentMarker.getLatLng() : null;
        },

        removeMarker: function () {
            if (currentMarker) {
                map.removeLayer(currentMarker);
                currentMarker = null;
                return true;
            }
            return false;
        },

        disable: function () {
            map.off("dblclick", handleDoubleClick);
            this.removeMarker();
            map.doubleClickZoom.enable();
        },
    };
};

export function useSetMarkerMapControl() {
    const {setSelectedPoint, selectedPoint} = useMapContext();

    let markerControlRef = useRef(null);

    useEffect(() => {
        if (selectedPoint) {
            markerControlRef.current.createMarker(selectedPoint);
        }
    }, [selectedPoint]);

    const addSetMarkerMapControl = map => {
        // Initialize the handler
        markerControlRef.current = L.SingleMarkerHandler(map, {
            markerOptions: {
                // Custom marker options here
            },
            setSelectedPoint,
            selectedPoint,
        });
    };

    return {addSetMarkerMapControl};
}
