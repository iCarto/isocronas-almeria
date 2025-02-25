import {useState, useEffect} from "react";
import {useDomainContext} from "base/domain/provider";
import {useUrlParams} from "base/navigation/provider";

const useBoundingBox = () => {
    const {municipalities} = useDomainContext();
    const {searchParams} = useUrlParams();

    const [boundingBox, setBoundingBox] = useState(null);

    const findMunicipalityByCode = code =>
        municipalities.find(municipality => municipality.code === code);

    useEffect(() => {
        if (municipalities.length === 0) return;

        const municipalityCode = searchParams.get("municipality");
        const municipality = findMunicipalityByCode(municipalityCode);
        if (municipalityCode) {
            setBoundingBox(municipality?.bbox ?? null);
        }
    }, [municipalities, searchParams]);

    return {boundingBox, setBoundingBox};
};

export default useBoundingBox;
