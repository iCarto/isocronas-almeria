import {useEffect} from "react";
import {useUrlParams} from "base/navigation/provider";
import {useMapContext} from "base/map";
import {useMunicipalities} from "municipality/hooks";
import {usePoisIsochroneContext} from ".";

const PoisMapParamsProvider = ({children = null}) => {
    const {municipalities} = useMunicipalities();
    const {
        selectedTravelTime,
        setSelectedTravelTime,
        selectedTransport,
        setSelectedTransport,
        setIsochrone,
    } = usePoisIsochroneContext();
    const {searchParams} = useUrlParams();
    const {
        setBoundingBox,
        mapFilter,
        updateMapFilter,
        selectedPoint,
        setSelectedPoint,
    } = useMapContext();

    const findMunicipalityByCode = code =>
        municipalities.find(municipality => municipality.code === code);

    useEffect(() => {
        if (searchParams.get("selected_point")) {
            // {lat: coordinates[0], lng: coordinates[1]}
            const size =
                searchParams.get("travel_time") == "driving"
                    ? 0.1
                    : searchParams.get("travel_time") == "cycling"
                      ? 0.05
                      : 0.01;
            const coordinates = searchParams
                .get("selected_point")
                .split(",")
                .map(x => Number(x));
            const bbox = [
                coordinates[1] - size,
                coordinates[0] - size,
                coordinates[1] + size,
                coordinates[0] + size,
            ];
            setBoundingBox(bbox);
            return;
        }
        if (municipalities.length === 0) return;
        const municipalityCode = searchParams.get("municipality");
        const municipality = findMunicipalityByCode(municipalityCode);
        if (municipalityCode) {
            setBoundingBox(municipality?.bbox ?? null);
        }
    }, [municipalities]);

    useEffect(() => {
        // Init isochrone provider state from filter values
        if (!selectedTravelTime && searchParams.get("travel_time")) {
            setSelectedTravelTime(searchParams.get("travel_time"));
        }
        if (!selectedTransport && searchParams.get("transport")) {
            // TODO (egago): enabling this filter by default produces 2 calls on init
            setSelectedTransport(searchParams.get("transport"));
        }
        if (!selectedPoint && searchParams.get("selected_point")) {
            setSelectedPoint(searchParams.get("selected_point"));
        }
    }, [mapFilter]);

    useEffect(() => {
        setIsochrone(null);
        updateMapFilter({...mapFilter, selected_point: selectedPoint});
    }, [selectedPoint]);

    useEffect(() => {
        setIsochrone(null);
        updateMapFilter({...mapFilter, travel_time: selectedTravelTime});
    }, [selectedTravelTime]);

    useEffect(() => {
        setIsochrone(null);
        updateMapFilter({...mapFilter, transport: selectedTransport});
    }, [selectedTransport]);

    return <>{children}</>;
};
export default PoisMapParamsProvider;
