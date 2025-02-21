import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";
import {
    DomainFormParentChildSelect,
    DomainFormSelect,
    DomainFormSelectMultipleChip,
} from "base/domain/components";
import Grid from "@mui/material/Grid";

const PoiFilterFormFields = ({onChangeHandler = null}) => {
    const {_} = useLingui();

    return (
        <Grid container columnSpacing={1} alignItems="center">
            <Grid item xs={12}>
                <DomainFormSelect
                    name="category"
                    label={_(msg`Categorías`)}
                    category="poi_category_group"
                    onChange={onChangeHandler}
                />
                {/* <DomainFormSelectMultipleChip
                    name="poi_category"
                    label={_(msg`Categorías`)}
                    category="poi_category_group"
                    nestedCategory="poi_category"
                    onChangeHandler={onChangeHandler}
                /> */}
                {/* <DomainFormParentChildSelect
                    parent={{
                        name: "poi_category",
                        label: _(msg`Categorías`),
                        category: "poi_category_group",
                    }}
                    child={{
                        name: "poi_category",
                        label: _(msg`Subcategorías`),
                        category: "poi_category",
                    }}
                /> */}
            </Grid>
        </Grid>
    );
};

export default PoiFilterFormFields;
