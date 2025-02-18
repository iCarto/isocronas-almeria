import {useNavigate} from "react-router-dom";
import {Trans} from "@lingui/macro";

import {MenuAction} from "base/ui/menu";
import LaunchIcon from "@mui/icons-material/Launch";

export function useMenuGenericViewAction() {
    const navigate = useNavigate();

    const handleClickDetail = element => {
        navigate(element.id.toString()); // Transform to string because navigate(1) (or any number) is resolved with local history
    };

    const action = (
        <MenuAction
            key="table-view-action"
            id="table-view-action"
            icon={<LaunchIcon />}
            text={<Trans>View detail</Trans>}
            handleClick={handleClickDetail}
        />
    );

    return {action};
}
