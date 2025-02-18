import {Children, cloneElement} from "react";

import {FormSection} from "base/form/components";

import Grid from "@mui/material/Grid";

const FormSectionLayout = ({title = null, columns = 2, children}) => {
    const formContent = (
        <Grid container columnSpacing={1}>
            {Children.map(children, child => (
                <Grid item xs={12} md={12 / columns}>
                    {child ? cloneElement(child) : null}
                </Grid>
            ))}
        </Grid>
    );
    return title ? <FormSection title={title}>{formContent}</FormSection> : formContent;
};

export default FormSectionLayout;
