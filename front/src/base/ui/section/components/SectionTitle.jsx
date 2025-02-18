import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LabelIcon from "@mui/icons-material/Label";

const SectionTitle = ({children, showTitleIcon = true, titleExtras = null}) => {
    return (
        <Grid container flexDirection="row" wrap="nowrap" alignItems="center">
            {showTitleIcon && <LabelIcon sx={{color: "secondary.lighter", mr: 1}} />}
            <Typography
                variant="h6"
                color="grey.700"
                fontWeight="bold"
                textTransform="uppercase"
            >
                {children}
            </Typography>
            {titleExtras}
        </Grid>
    );
};

export default SectionTitle;
