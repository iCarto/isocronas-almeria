import Stack from "@mui/material/Stack";
import IsocronasMapTravelTimeAction from "./IsocronasMapTravelTimeAction";
import IsocronasMapTransportAction from "./IsocronasMapTransportAction";
import Divider from "@mui/material/Divider";
import IsocronasMapSelectPointAction from "./IsocronasMapSelectPointAction";
import Grid from "@mui/material/Grid";
import IsocronasFilterHelper from "./IsocronasFilterHelper";

const IsocronasFilterSelector = () => {
    return (
        <>
            <Grid container spacing={1} sx={{p: 1}}>
                <Grid item xs={12}>
                    <IsocronasFilterHelper />
                </Grid>
                <Grid item xs={4}>
                    <Stack alignItems="center" justifyContent="center">
                        <IsocronasMapSelectPointAction />
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <Stack spacing={1}>
                        <IsocronasMapTransportAction />
                        <IsocronasMapTravelTimeAction />
                    </Stack>
                </Grid>
            </Grid>
            <Divider />
        </>
    );
};

export default IsocronasFilterSelector;
