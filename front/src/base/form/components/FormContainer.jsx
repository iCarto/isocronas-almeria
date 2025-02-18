import {theme} from "Theme";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FormContainer = ({children, label = "", style = {}}) => {
    return (
        <Grid
            container
            flexDirection="column"
            p={1}
            border={1}
            borderColor={"primary.main"}
            borderRadius={1}
            sx={{backgroundColor: theme.palette.pageBackground.secondary, ...style}}
        >
            {label ? (
                <Typography variant="overline" color="primary.light" pl={0.5}>
                    {label}
                </Typography>
            ) : null}
            {children}
        </Grid>
    );
};

export default FormContainer;
