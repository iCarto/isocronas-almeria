import {Trans} from "@lingui/macro";

import {AuthAction} from "base/user/components";
import {SidebarAction} from ".";

import DeleteIcon from "@mui/icons-material/Delete";

const SidebarDeleteAction = ({onClick, roles = []}) => {
    return (
        <AuthAction key="delete-entity" roles={roles}>
            <SidebarAction
                name="delete-entity"
                text={<Trans>Delete</Trans>}
                icon={<DeleteIcon color="error" />}
                onClick={() => onClick()}
            />
        </AuthAction>
    );
};

export default SidebarDeleteAction;
