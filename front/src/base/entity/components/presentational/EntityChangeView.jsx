import {useEntityListPageContext} from "base/entity/provider";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const EntityChangeView = ({views}) => {
    const {view: selectedView, setView} = useEntityListPageContext();

    const handleChange = selectedView => {
        setView(selectedView);
    };

    return (
        views?.length && (
            <ToggleButtonGroup
                color="primary"
                value={selectedView}
                exclusive
                onChange={(e, view) => handleChange(view)}
            >
                {views?.includes("table") && (
                    <ToggleButton value="table">
                        <FormatListBulletedOutlinedIcon fontSize="small" />
                    </ToggleButton>
                )}
                {views?.includes("list") && (
                    <ToggleButton value="list">
                        <GridViewOutlinedIcon fontSize="small" />
                    </ToggleButton>
                )}
                {views?.includes("map") && (
                    <ToggleButton value="map">
                        <MapOutlinedIcon fontSize="small" />
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
        )
    );
};

export default EntityChangeView;
