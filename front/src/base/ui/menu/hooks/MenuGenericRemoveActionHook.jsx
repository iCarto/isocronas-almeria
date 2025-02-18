import {useState} from "react";
import {Trans} from "@lingui/macro";

import {useNavigateWithReload} from "base/navigation/hooks";
import {useErrors} from "base/error/provider";

import {MenuAction} from "base/ui/menu";
import {ErrorAlerts} from "base/error/components";
import {RemoveItemDialog} from "base/delete/components";

import LinkOffIcon from "@mui/icons-material/LinkOff";

export function useMenuGenericRemoveAction(service) {
    const navigate = useNavigateWithReload();
    const {handleErrors, clearErrors} = useErrors();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [element, setElement] = useState(false);

    const handleClickRemove = element => {
        setIsRemoveDialogOpen(true);
        setElement(element);
    };

    const handleRemove = () => {
        clearErrors();
        service(element)
            .then(() => {
                navigate("", true);
            })
            .catch(error => {
                handleErrors(error);
            });
    };

    const action = (
        <MenuAction
            key="table-remove-action"
            id="table-remove-action"
            icon={<LinkOffIcon />}
            text={<Trans>Remove</Trans>}
            handleClick={handleClickRemove}
        />
    );

    const dialog = (
        <>
            <ErrorAlerts />
            <RemoveItemDialog
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
                onRemove={handleRemove}
            />
        </>
    );

    return {action, dialog};
}
