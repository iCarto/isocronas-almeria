import {PaperContainer} from "base/ui/containers";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FormSection = ({title = "", ...props}) => {
    return (
        <PaperContainer>
            {title ? (
                <Grid item xs={12} mb={2}>
                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>
                </Grid>
            ) : null}
            <Grid item container justifyContent="flex-start" columnSpacing={1} xs={12}>
                {props.children}
            </Grid>
        </PaperContainer>
    );
};

export default FormSection;
