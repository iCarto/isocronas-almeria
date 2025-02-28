import {useEffect} from "react";
import {useDomainContext} from "base/domain/provider";
import {useUrlParams} from "base/navigation/provider";
import {useMapContext} from "base/map";

const PoisMapParams = ({children = null}) => {
    const {municipalities} = useDomainContext();
    const {searchParams} = useUrlParams();
    const {setBoundingBox} = useMapContext();

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

    return <>{children}</>;
};
export default PoisMapParams;
