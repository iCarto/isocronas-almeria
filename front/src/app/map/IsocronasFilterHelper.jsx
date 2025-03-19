import {useMapContext} from "base/map";
import Typography from "@mui/material/Typography";
import {usePoisIsochroneContext} from "poi/map";
import {theme} from "Theme";

const IsocronasFilterHelper = () => {
    const {selectedPoint} = useMapContext();
    const {selectedTransport, selectedTravelTime} = usePoisIsochroneContext();

    const getHelperText = () => {
        if (!selectedPoint) {
            return "Haga doble click en el mapa para seleccionar un punto";
        }
        if (!selectedTransport) {
            return "Seleccione también un medio de transporte";
        }
        if (!selectedTravelTime) {
            return "Seleccione un periodo de tiempo";
        }
    };

    return (
        <Typography fontSize={10} textAlign="center" color={theme.palette.warning.main}>
            {getHelperText()}
        </Typography>
    );
};

export default IsocronasFilterHelper;
