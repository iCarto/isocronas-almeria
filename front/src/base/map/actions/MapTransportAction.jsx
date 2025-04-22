import {MapAction} from ".";
import DepartureBoardOutlinedIcon from "@mui/icons-material/DepartureBoardOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import DirectionsBikeOutlinedIcon from "@mui/icons-material/DirectionsBikeOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import {usePoisIsochroneContext} from "poi/map";

const options = [
    {label: "A pie", value: "walking", icon: <DirectionsWalkOutlinedIcon />},
    {label: "Bici", value: "cycling", icon: <DirectionsBikeOutlinedIcon />},
    {label: "Coche", value: "driving", icon: <DirectionsCarFilledOutlinedIcon />},
];

const MapTransportAction = () => {
    const {selectedTransport: selectedOption, setSelectedTransport: setSelectedOption} =
        usePoisIsochroneContext();

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
