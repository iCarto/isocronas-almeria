import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const SectionValueBox = ({size = null, isHighlighted = false, children}) => {
    const emptyField = (
        <Typography component="span" sx={{fontSize: 14, fontStyle: "italic"}}>
            —
        </Typography>
    );

    return (
        <Grid
            item
            xs={size}
            sx={{
                width: "100%",
                borderRadius: 1,
                border: isHighlighted ? 2 : 0,
                borderColor: "grey.300",
                backgroundColor: "grey.100",
                p: 1,
                fontSize: 14,
                alignContent: "center",
                flexGrow: 1,
            }}
        >
            {children || emptyField}
        </Grid>
    );
};

export default SectionValueBox;
