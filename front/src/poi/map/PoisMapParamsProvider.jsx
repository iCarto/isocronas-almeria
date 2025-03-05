import {useEffect} from "react";
import {useUrlParams} from "base/navigation/provider";
import {useMapContext} from "base/map";
import {useMunicipalities} from "municipality/hooks";

const PoisMapParamsProvider = ({children = null}) => {
    const {municipalities} = useMunicipalities();
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
export default PoisMapParamsProvider;
