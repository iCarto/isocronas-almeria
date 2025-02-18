import {cloneElement, useState} from "react";
import {Trans} from "@lingui/macro";

import {useNavigateWithReload} from "base/navigation/hooks";
import {useErrors} from "base/error/provider";
import {useDialog} from "base/dialog/hooks";

import {MenuAction} from "base/ui/menu";
import {EntityManageDialog} from "base/entity/components/container";
import EditIcon from "@mui/icons-material/Edit";

export function useEditAction(service, entityForm, entityName) {
    const navigate = useNavigateWithReload();
    const {isDialogOpen, openDialog, closeDialog} = useDialog();
    const {handleErrors} = useErrors();

    const [itemId, setItemId] = useState(null);

    const handleClickEdit = item => {
        setItemId(item);
        openDialog();
    };

    const handleFormSubmit = item => {
        return service
            .update({...item})
            .then(response => {
                navigate("", true);
            })
            .catch(error => {
                handleErrors(error);
            })
            .finally(() => {
                closeDialog();
            });
    };

    const editAction = (
        <MenuAction
            key="table-edit-action"
            id={"table-edit-action"}
            icon={<EditIcon />}
            text={<Trans>Edit</Trans>}
            handleClick={handleClickEdit}
        />
    );

    const editDialog = (
        <EntityManageDialog
            dialogTitle={<Trans>{`Edit ${entityName.toLowerCase()}`}</Trans>}
            dialogContent={cloneElement(entityForm, {
                element: itemId,
                onSubmit: handleFormSubmit,
                onCancel: () => {
                    closeDialog();
                },
            })}
            isDialogOpen={isDialogOpen}
        />
    );

    return {editAction, editDialog};
}
