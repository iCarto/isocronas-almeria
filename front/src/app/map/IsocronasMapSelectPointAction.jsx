import {useMapContext} from "base/map";

import {theme} from "Theme";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const IsocronasMapSelectPointAction = () => {
    const {selectedPoint} = useMapContext();

    return (
        <PlaceOutlinedIcon
            sx={{
                fontSize: 60,
                color: selectedPoint ? "#2e85cb" : theme.palette.warning.light,
            }}
        />
    );
};

export default IsocronasMapSelectPointAction;
