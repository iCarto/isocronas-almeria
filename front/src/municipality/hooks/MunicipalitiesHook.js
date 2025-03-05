import {useState, useEffect} from "react";
import {MunicipalityRepository} from "municipality/repository";
import {useErrors} from "base/error/provider";

function useMunicipalities() {
    const {handleErrors} = useErrors();

    const [municipalities, setMunicipalities] = useState([]);

    useEffect(() => {
        MunicipalityRepository.getList()
            .then(response => setMunicipalities(response))
            .catch(error => handleErrors(error));
    }, []);

    return {municipalities};
}

export default useMunicipalities;
