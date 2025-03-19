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
                    <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <IsocronasMapSelectPointAction />
                        <Divider orientation="vertical" flexItem />
                        <IsocronasMapTransportAction />
                        <Divider orientation="vertical" flexItem />
                        <IsocronasMapTravelTimeAction />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <IsocronasFilterHelper />
                </Grid>
            </Grid>
            <Divider />
        </>
    );
};

export default IsocronasFilterSelector;
