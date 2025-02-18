import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

const Spinner = ({small = false, ...props}) => {
    return (
        <Stack justifyContent="center" alignItems="center" my={small ? 0 : 6}>
            <CircularProgress size={small ? 20 : 40} sx={{...props}} />
        </Stack>
    );
};

export default Spinner;
