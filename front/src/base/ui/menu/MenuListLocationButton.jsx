import {Trans} from "@lingui/macro";
import {MenuListItemButton} from ".";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const MenuListLocationButton = ({isGroupItem = true}) => {
    return (
        <MenuListItemButton
            to="location"
            text={<Trans>Location</Trans>}
            icon={<LocationOnOutlinedIcon />}
            isGroupItem={isGroupItem}
        />
    );
};

export default MenuListLocationButton;
