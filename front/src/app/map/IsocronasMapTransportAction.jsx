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

    const selected = options.find(option => option.value === selectedOption);

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            {selected ? (
                createElement(selected.icon, {sx: {color: "#2e85cb"}})
            ) : (
                <DirectionsWalkOutlinedIcon
                    sx={{
                        color:
                            selectedPoint && !selectedOption
                                ? theme.palette.warning.light
                                : "inherit",
                    }}
                />
            )}

            <ToggleButtonGroup
                value={selectedOption}
                exclusive
                onChange={handleOption}
                aria-label="selector de transporte"
            >
                {options.map(option => (
                    <ToggleButton
                        key={option.value}
                        value={option.value}
                        aria-label={`${option.label}`}
                    >
                        {createElement(option.icon, {fontSize: "small"})}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
};

export default IsocronasMapTransportAction;
