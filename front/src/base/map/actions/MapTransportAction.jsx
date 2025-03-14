import {useMapContext} from "../MapProvider";
import {MapAction} from ".";
import DepartureBoardOutlinedIcon from "@mui/icons-material/DepartureBoardOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import DirectionsBikeOutlinedIcon from "@mui/icons-material/DirectionsBikeOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";

const options = [
    {label: "A pie", value: "walking", icon: <DirectionsWalkOutlinedIcon />},
    {label: "Bici", value: "cycling", icon: <DirectionsBikeOutlinedIcon />},
    {
        label: "Transporte público",
        value: "public_transport",
        icon: <DirectionsBusFilledOutlinedIcon />,
    },
    {label: "Coche", value: "driving", icon: <DirectionsCarFilledOutlinedIcon />},
];

const MapTransportAction = () => {
    const {selectedTransport: selectedOption, setSelectedTransport: setSelectedOption} =
        useMapContext();

    const handleOption = option => {
        setSelectedOption(option.value);
    };

    const getSelectedOption = () => {
        return options.find(option => selectedOption === option.value);
    };

    return (
        <MapAction
            actionName="Medio de transporte"
            icon={getSelectedOption()?.icon || <DepartureBoardOutlinedIcon />}
            options={options}
            selectedOption={getSelectedOption()}
            onChange={handleOption}
        />
    );
};

export default MapTransportAction;
