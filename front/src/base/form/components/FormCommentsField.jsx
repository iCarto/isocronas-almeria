import {Trans} from "@lingui/macro";

import {FormTextArea} from ".";
import Grid from "@mui/material/Grid";

const FormCommentsField = ({placeholder = "", displayLabel = true}) => {
    return (
        <Grid container>
            <FormTextArea
                name="comments"
                label={displayLabel ? <Trans>Comments</Trans> : null}
                maxLength={500}
                placeholder={placeholder}
            />
        </Grid>
    );
};

export default FormCommentsField;
