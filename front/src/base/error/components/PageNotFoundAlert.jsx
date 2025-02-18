import {t, Trans} from "@lingui/macro";

import {useErrors} from "../provider";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const PageNotFoundAlert = ({errors = [{message: t`Page not found`}]}) => {
    const {clearErrors} = useErrors();

    const handleClose = () => {
        clearErrors();
    };

    return (
        <Stack maxWidth="80%" marginX="auto" marginY={2}>
            <Alert severity="warning" onClose={handleClose}>
                <AlertTitle>{errors.map(error => error.message).join(" ")}</AlertTitle>
                <Trans>
                    Try clearing the active filters or navigating to a different page.
                </Trans>
            </Alert>
        </Stack>
    );
};

export default PageNotFoundAlert;
