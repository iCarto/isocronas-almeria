import {Trans} from "@lingui/macro";

import {AuthAction} from "base/user/components";
import {SidebarAction} from ".";

import EditIcon from "@mui/icons-material/Edit";

const SidebarEditAction = ({onClick, roles = []}) => {
    return (
        <AuthAction key="edit-entity" roles={roles}>
            <SidebarAction
                name="edit-entity"
                text={<Trans>Edit</Trans>}
                icon={<EditIcon />}
                onClick={() => onClick()}
            />
        </AuthAction>
    );
};

export default SidebarEditAction;
