import {useEffect} from "react";
import {useUrlParams} from "base/navigation/provider";
import {useMapContext} from "base/map";
import {useMunicipalities} from "municipality/hooks";
import {usePoisIsochroneContext} from ".";

const PoisMapParamsProvider = ({children = null}) => {
    const {municipalities} = useMunicipalities();
    const {selectedTravelTime, selectedTransport, setIsochrone} =
        usePoisIsochroneContext();
    const {searchParams} = useUrlParams();
    const {setBoundingBox, mapFilter, updateMapFilter, selectedPoint} = useMapContext();

    const findMunicipalityByCode = code =>
        municipalities.find(municipality => municipality.code === code);

    useEffect(() => {
        if (municipalities.length === 0) return;

        const municipalityCode = searchParams.get("municipality");
        const municipality = findMunicipalityByCode(municipalityCode);
        if (municipalityCode) {
            setBoundingBox(municipality?.bbox ?? null);
        }
    }, [municipalities]);

    useEffect(() => {
        setIsochrone(null);
        updateMapFilter({...mapFilter, travel_time: selectedTravelTime});
    }, [selectedTravelTime]);

    useEffect(() => {
        setIsochrone(null);
        updateMapFilter({...mapFilter, transport: selectedTransport});
    }, [selectedTransport]);

    useEffect(() => {
        setIsochrone(null);
    }, [selectedPoint]);

    return <>{children}</>;
};
export default PoisMapParamsProvider;
