import {usePoisIsochroneContext} from "poi/map";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Stack from "@mui/material/Stack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import {theme} from "Theme";
import {useMapContext} from "base/map";

const options = [
    {label: "15 min", value: 15},
    {label: "30 min", value: 30},
    {label: "1 h", value: 60},
];

const IsocronasMapTravelTimeAction = () => {
    const {
        selectedTravelTime: selectedOption,
        setSelectedTravelTime: setSelectedOption,
        selectedTransport,
    } = usePoisIsochroneContext();
    const {selectedPoint} = useMapContext();

    const handleOption = (event, value) => {
        console.log({value});
        setSelectedOption(parseInt(value));
    };

    return (
        <Stack alignItems="center">
            <Typography variant="caption">Tiempo</Typography>
            <ToggleButtonGroup
                value={selectedOption}
                exclusive
                onChange={handleOption}
                aria-label="selector de tiempo"
                size="small"
            >
                {options.map(option => (
                    <ToggleButton
                        key={option.value}
                        value={option.value}
                        aria-label={`${option.value} minutos`}
                        sx={{
                            color:
                                selectedPoint && selectedTransport && !selectedOption
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
                        <Stack>
                            <Typography fontSize={12} lineHeight={1}>
                                {option.value}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontSize={8}
                                textTransform="lowercase"
                                lineHeight={1}
                            >
                                mins
                            </Typography>
                        </Stack>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
};

export default IsocronasMapTravelTimeAction;
