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

    const getFilteredFeatures = (features, geometry) => {
        return pointsWithinPolygon(features, geometry);
    };

    return {
        getPolygon,
        getDifference,
        getFilteredFeatures,
    };
}

export {useTurfUtil};
