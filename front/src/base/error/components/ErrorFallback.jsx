import {Trans} from "@lingui/macro";
import {PaperContainer} from "base/ui/containers";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ErrorFallback({error, resetErrorBoundary = null}) {
    return (
        <PaperContainer
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "480px",
                margin: "auto",
                mt: 5,
                padding: 3,
            }}
            role="alert"
        >
            <Typography variant="h6" gutterBottom>
                <Trans>Something went wrong:</Trans>
            </Typography>
            <Alert severity="error" sx={{whiteSpace: "pre-wrap"}}>
                {error.message}
            </Alert>
            {resetErrorBoundary && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={resetErrorBoundary}
                    sx={{marginTop: 2}}
                >
                    <Trans>Reset</Trans>
                </Button>
            )}
        </PaperContainer>
    );
}

export default ErrorFallback;
