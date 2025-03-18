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

    const selected = options.find(option => option.value === selectedOption);

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Badge
                badgeContent={selected?.value}
                sx={{
                    "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: "#2e85cb",
                    },
                }}
            >
                <AccessTimeIcon
                    sx={{
                        color: selectedOption
                            ? "#2e85cb"
                            : selectedPoint && selectedTransport && !selectedOption
                              ? theme.palette.warning.light
                              : "inherit",
                    }}
                />
            </Badge>
            <ToggleButtonGroup
                value={selectedOption}
                exclusive
                onChange={handleOption}
                aria-label="selector de tiempo"
            >
                {options.map(option => (
                    <ToggleButton
                        key={option.value}
                        value={option.value}
                        aria-label={`${option.value} minutos`}
                    >
                        <Typography variant="caption">{option.value}</Typography>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
};

export default IsocronasMapTravelTimeAction;
