import {SectionValueBox} from ".";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SectionFieldsWithTags = ({fields}) => {
    return (
        <Grid container spacing={2} direction="row">
            {fields.map((section, index) => (
                <Grid key={index} item container xs={12} md={6}>
                    <Stack height="100%" width="100%">
                        <Typography
                            variant="overline"
                            color="text.secondary"
                            fontWeight={500}
                            lineHeight={1.75}
                        >
                            {section.label}
                        </Typography>
                        <SectionValueBox>
                            <Stack direction="row" spacing={1}>
                                {section.content}
                            </Stack>
                        </SectionValueBox>
                    </Stack>
                </Grid>
            ))}
        </Grid>
    );
};

export default SectionFieldsWithTags;
