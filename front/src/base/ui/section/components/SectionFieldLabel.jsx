import Typography from "@mui/material/Typography";

const SectionFieldLabel = ({label, isHighlighted = false}) => {
    return (
        <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight={isHighlighted ? 600 : 500}
            lineHeight={{xs: 1.5, sm: 1.25}}
            sx={{
                hyphens: "auto",
            }}
        >
            {label}:
        </Typography>
    );
};

export default SectionFieldLabel;
