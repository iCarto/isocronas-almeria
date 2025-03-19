import {usePoisIsochroneContext} from "poi/map";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Stack from "@mui/material/Stack";
import {theme} from "Theme";

import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import DirectionsBikeOutlinedIcon from "@mui/icons-material/DirectionsBikeOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import {createElement} from "react";
import {useMapContext} from "base/map";
import Typography from "@mui/material/Typography";

const options = [
    {label: "A pie", value: "walking", icon: DirectionsWalkOutlinedIcon},
    {label: "Bici", value: "cycling", icon: DirectionsBikeOutlinedIcon},
    {
        label: "Transporte público",
        value: "public_transport",
        icon: DirectionsBusFilledOutlinedIcon,
    },
    {label: "Coche", value: "driving", icon: DirectionsCarFilledOutlinedIcon},
];

const IsocronasMapTransportAction = () => {
    const {selectedTransport: selectedOption, setSelectedTransport: setSelectedOption} =
        usePoisIsochroneContext();
    const {selectedPoint} = useMapContext();

    const handleOption = (event, value) => {
        console.log({value});
        setSelectedOption(value);
    };

    return (
        <Stack alignItems="center">
            <Typography variant="caption">Medio de transporte</Typography>
            <ToggleButtonGroup
                value={selectedOption}
                exclusive
                onChange={handleOption}
                aria-label="selector de transporte"
                size="small"
            >
                {options.map(option => (
                    <ToggleButton
                        key={option.value}
                        value={option.value}
                        aria-label={`${option.label}`}
                        sx={{
                            color:
                                selectedPoint && !selectedOption
                                    ? theme.palette.warning.light
                                    : "inherit",
                            "&.Mui-selected": {
                                backgroundColor: "#2e85cb",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#2e85ee",
                                },
                            },
                        }}
                    >
                        {createElement(option.icon, {
                            fontSize: "small",
                        })}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
};

export default IsocronasMapTransportAction;
