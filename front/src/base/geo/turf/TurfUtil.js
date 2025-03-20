import {polygon, featureCollection} from "@turf/helpers";
import {difference} from "@turf/difference";
import {pointsWithinPolygon} from "@turf/points-within-polygon";

function useTurfUtil() {
    const getPolygon = points => {
        return polygon(points);
    };

    const getDifference = features => {
        return difference(featureCollection(features));
    };

    const getFilteredFeatures = (featureCollection, featurePolygon) => {
        const validFeatures = {
            type: "FeatureCollection",
            features: featureCollection.features.filter(
                feature =>
                    feature &&
                    feature.geometry !== null &&
                    feature.geometry !== undefined &&
                    feature.geometry.type === "Point"
            ),
        };
        return pointsWithinPolygon(validFeatures, featurePolygon);
    };

    return {
        getPolygon,
        getDifference,
        getFilteredFeatures,
    };
}

export {useTurfUtil};
