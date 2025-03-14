const GeojsonUtil = {
    hasValidCoordinates(geojson) {
        if (!geojson) {
            return false;
        }
        // Helper function to check if coordinates are empty
        const isEmptyCoordinates = coords => {
            if (Array.isArray(coords)) {
                if (coords.length === 0) return true;
                return coords.every(isEmptyCoordinates);
            }
            return false;
        };

        // Helper function to check a single feature
        const checkFeature = feature => {
            if (!feature.geometry || !feature.geometry.coordinates) {
                return false;
            }
            return !isEmptyCoordinates(feature.geometry.coordinates);
        };

        if (geojson.type === "FeatureCollection") {
            if (!geojson.features || geojson.features.length === 0) {
                return false;
            }
            return geojson.features.some(checkFeature);
        } else if (geojson.type === "Feature") {
            return checkFeature(geojson);
        } else {
            // Invalid GeoJSON type
            return false;
        }
    },

    isSingleFeature(geojson) {
        return geojson?.type === "Feature";
    },

    convertToCollection(geojson) {
        if (this.isSingleFeature(geojson)) {
            return {
                type: "FeatureCollection",
                features: [geojson],
            };
        }
        return geojson;
    },
};

export default GeojsonUtil;
