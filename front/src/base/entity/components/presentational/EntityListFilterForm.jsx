import {Children, cloneElement} from "react";
import {FormProvider, useForm} from "react-hook-form";

import {useListPageGroupContext} from "base/ui/page/provider";
import {FormClearButtonSmall} from "base/form/components";

import Grid from "@mui/material/Grid";

const EntityListFilterForm = ({
    defaultValues,
    layout: {columns = 2} = {},
    children = null,
}) => {
    const {setFilterValue, resetFilter} = useListPageGroupContext();

    const formMethods = useForm({
        defaultValues: {...defaultValues},
    });

    const handleClearAllFilters = () => {
        formMethods.reset();
        resetFilter({...defaultValues});
    };

    const handleChange = (value, property) => {
        setFilterValue(property, value);
    };

    return (
        <FormProvider {...formMethods}>
            <Grid container columnSpacing={1} alignItems="center">
                <Grid item container spacing={1} xs={11}>
                    {Children.map(children, child => (
                        <Grid item xs={12} md={12 / columns}>
                            {cloneElement(child, {onChangeHandler: handleChange})}
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={1}>
                    <FormClearButtonSmall handleClear={handleClearAllFilters} />
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default EntityListFilterForm;
