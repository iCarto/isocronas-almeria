import {MapboxIsochroneService} from "poi/service";
import {polygon, featureCollection} from "@turf/helpers";
import {difference} from "@turf/difference";

const isochroneFromStore = params => {
    return JSON.parse(localStorage.getItem(params.getKey()));
};

const IsochroneRepository = {
    // params is of type MapboxParams
    get: async params => {
        console.log(params);
        let storedIsochrone = isochroneFromStore(params);
        if (!storedIsochrone) {
            await MapboxIsochroneService.get(params).then(result => {
                storedIsochrone = {
                    params: params,
                    isochrone: result,
                };
                localStorage.setItem(params.getKey(), JSON.stringify(storedIsochrone));
            });
        }
        const envelope = polygon([
            [
                [-7.0, 33.0],
                [-7.0, 40.0],
                [2.0, 40.0],
                [2.0, 33.0],
                [-7.0, 33.0],
            ],
        ]);

        return difference(
            featureCollection([envelope, storedIsochrone.isochrone.features[0]])
        );
    },
};

export default IsochroneRepository;
