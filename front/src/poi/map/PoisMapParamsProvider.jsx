import {useEffect} from "react";
import {useUrlParams} from "base/navigation/provider";
import {useMapContext} from "base/map";
import {useMunicipalities} from "municipality/hooks";
import {usePoisIsochroneContext} from ".";

const PoisMapParamsProvider = ({children = null}) => {
    const {municipalities} = useMunicipalities();
    const {selectedTravelTime, selectedTransport, isochrone} =
        usePoisIsochroneContext();
    const {searchParams} = useUrlParams();
    const {setBoundingBox, mapFilter, updateMapFilter} = useMapContext();

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
        updateMapFilter({...mapFilter, travel_time: selectedTravelTime});
    }, [selectedTravelTime]);

    useEffect(() => {
        updateMapFilter({...mapFilter, transport: selectedTransport});
    }, [selectedTransport]);

    useEffect(() => {
        console.log("ISOCHRONE UPDATED", {isochrone});
        updateMapFilter({...mapFilter, isochrone: isochrone});
    }, [isochrone]);

    return <>{children}</>;
};
export default PoisMapParamsProvider;
