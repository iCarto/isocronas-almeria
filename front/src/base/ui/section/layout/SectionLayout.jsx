import {Children, cloneElement} from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const SectionLayout = ({title = null, columns = 2, children}) => {
    return (
        <>
            {title ? (
                <Grid item xs={12} mb={2}>
                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>
                </Grid>
            ) : null}
            <Grid container columnSpacing={2} rowSpacing={1}>
                {Children.map(children, (child, index) => (
                    <Grid item xs={12} md={12 / columns} key={index}>
                        {cloneElement(child)}
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default SectionLayout;
