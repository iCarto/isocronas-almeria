import {t} from "@lingui/macro";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const NoContentMessage = ({text = t`No item found.`, button = null, style = {}}) => {
    return (
        <Stack alignItems="center" spacing={2} my={2}>
            <Typography
                sx={{
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    ...style,
                }}
            >
                {text}
            </Typography>
            {button}
        </Stack>
    );
};

export default NoContentMessage;
