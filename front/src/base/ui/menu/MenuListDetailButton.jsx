import {Trans} from "@lingui/macro";

import {MenuListItemButton} from ".";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";

const MenuListDetailButton = ({isGroupItem = true}) => {
    return (
        <MenuListItemButton
            to="detail"
            text={<Trans>Detail</Trans>}
            icon={<InventoryRoundedIcon />}
            isGroupItem={isGroupItem}
        />
    );
};

export default MenuListDetailButton;
