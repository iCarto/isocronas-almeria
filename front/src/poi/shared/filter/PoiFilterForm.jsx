import {EntityListFilterForm} from "base/entity/components/presentational";
import {PoiFilterFormFields} from ".";

const PoiFilterForm = ({}) => {
    return (
        <EntityListFilterForm defaultValues={{category: ""}} layout={{columns: 1}}>
            <PoiFilterFormFields />
        </EntityListFilterForm>
    );
};

export default PoiFilterForm;
