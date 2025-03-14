import {polygon, featureCollection} from "@turf/helpers";
import {difference} from "@turf/difference";
import {createMapboxIsochroneConfig} from "../model";
import {MapboxService} from "../service";

const baseService = "isochrone/v1/";

const envelope = polygon([
    [
        [-7.0, 33.0],
        [-7.0, 40.0],
        [2.0, 40.0],
        [2.0, 33.0],
        [-7.0, 33.0],
    ],
]);

const getDifference = geojson => {
    return difference(featureCollection([envelope, geojson.features[0]]));
};

class MapboxIsocroneAdapter {
    constructor() {}

    getFeatures(filter) {
        console.log({filter});
        let coordinates = filter?.selected_point?.split(",");
        if (!coordinates) {
            coordinates = [36.972185, -2.468799];
        }
        const mapboxConfig = createMapboxIsochroneConfig({
            profile: `mapbox/${filter.transport}`,
            coordinates: {
                lng: coordinates[1],
                lat: coordinates[0],
            },
            contours: filter?.travel_time,
        });
        return MapboxService.get(baseService, mapboxConfig.getURL()).then(result =>
            getDifference(result)
        );
    }
}

const createMapboxIsochroneAdapter = () => {
    return new MapboxIsocroneAdapter();
};

export default createMapboxIsochroneAdapter;
