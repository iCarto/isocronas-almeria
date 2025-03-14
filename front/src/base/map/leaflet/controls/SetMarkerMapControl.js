import L from "leaflet";

L.SingleMarkerHandler = function (map, options) {
    options = options || {};

    let currentMarker = null;

    // Disable the default double-click zoom
    map.doubleClickZoom.disable();

    // Add double-click handler
    function handleDoubleClick(e) {
        console.log("Double click detected");

        // Remove existing marker
        if (currentMarker) {
            console.log("Removing existing marker");
            map.removeLayer(currentMarker);
            currentMarker = null;
        }

        // Create new marker
        console.log("Creating new marker");
        currentMarker = L.marker(e.latlng, options.markerOptions);
        currentMarker.addTo(map);

        const setSelectedPoint = options.setSelectedPoint;
        if (setSelectedPoint) {
            setSelectedPoint(`${e.latlng.lat},${e.latlng.lng}`);
        }
    }

    // Add the event listener
    map.on("dblclick", handleDoubleClick);

    // Return public API
    return {
        getMarker: function () {
            return currentMarker;
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

export function useSetMarkerMapControl(setSelectedPoint) {
    const addSetMarkerMapControl = map => {
        // Initialize the handler
        L.SingleMarkerHandler(map, {
            markerOptions: {
                // Custom marker options here
            },
            setSelectedPoint,
        });
    };

    return {addSetMarkerMapControl};
}
