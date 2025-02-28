import {MapAction} from ".";
import {useMapContext} from "..";
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
    } = useMapContext();

    const handleOption = option => {
        setSelectedOption(option);
    };

    return (
        <MapAction
            actionName="Tiempo de desplazamiento"
            icon={<AvTimerOutlinedIcon />}
            options={options}
            selectedOption={selectedOption}
            onChange={handleOption}
            displayBadge
            badgeContent={selectedOption ? `${selectedOption.value}'` : null}
        />
    );
};

export default MapTravelTimeAction;
