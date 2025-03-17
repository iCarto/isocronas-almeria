import {usePoisIsochroneContext} from "poi/map";
import {MapAction} from ".";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";

const options = [
    {label: "15 min", value: 15},
    {label: "30 min", value: 30},
    {label: "1 h", value: 60},
];

const MapTravelTimeAction = () => {
    const {
        selectedTravelTime: selectedOption,
        setSelectedTravelTime: setSelectedOption,
    } = usePoisIsochroneContext();

    const handleOption = option => {
        setSelectedOption(option.value);
    };

    return (
        <MapAction
            actionName="Tiempo de desplazamiento"
            icon={<AvTimerOutlinedIcon />}
            options={options}
            selectedOption={options.find(option => selectedOption === option.value)}
            onChange={handleOption}
            displayBadge
            badgeContent={selectedOption ? `${selectedOption}'` : null}
        />
    );
};

export default MapTravelTimeAction;
