import Typography from "@mui/material/Typography";

const SectionTitleSecondary = ({label, style = {}}) => {
    return (
        <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
                lineHeight: {xs: 1.5, sm: 1.25},
                mb: {xs: 0, sm: 1.5},
                textTransform: "uppercase",
                hyphens: "auto",
                ...style,
            }}
        >
            {label}
        </Typography>
    );
};

export default SectionTitleSecondary;
