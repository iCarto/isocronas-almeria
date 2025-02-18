import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const DividerWithHeading = ({label, textAlign = "left"}) => {
    return (
        <Divider textAlign={textAlign}>
            <Typography variant="overline" color="primary.light" pl={0.5}>
                {label}
            </Typography>
        </Divider>
    );
};

export default DividerWithHeading;
