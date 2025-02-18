import Box from "@mui/material/Box";

const Tag = ({
    children,
    color = "secondary.light",
    textColor = "inherit",
    style = {},
}) => {
    return (
        <Box
            sx={{
                mb: "3px",
                ml: "3px",
                px: "6px",
                py: "3px",
                backgroundColor: color,
                borderRadius: 1,
                color: textColor,
                alignSelf: "flex-start",
                fontSize: "12px",
                width: "fit-content",
                ...style,
            }}
        >
            {children}
        </Box>
    );
};

export default Tag;
