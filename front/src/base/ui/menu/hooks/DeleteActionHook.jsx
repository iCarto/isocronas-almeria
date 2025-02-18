import {useLocation} from "react-router-dom";
import {useState} from "react";
import {Trans} from "@lingui/macro";

import {useNavigateWithReload} from "base/navigation/hooks";
import {useErrors} from "base/error/provider";
import {useDialog} from "base/dialog/hooks";

import {MenuAction} from "base/ui/menu";
import {DeleteEntityButton, DeleteItemDialog} from "base/delete/components";

import DeleteIcon from "@mui/icons-material/Delete";

export function useDeleteAction(service, itemIdParam = null, basePath = null) {
    const navigate = useNavigateWithReload();
    const location = useLocation();
    const {handleErrors, clearErrors} = useErrors();

    const {isDialogOpen, openDialog, closeDialog} = useDialog();
    const [itemId, setItemId] = useState(null);

    const handleClickDelete = elementId => {
        setItemId(elementId);
        openDialog();
    };

    const handleDelete = () => {
        clearErrors();
        service
            .delete(itemId)
            .then(() => {
                navigate(basePath || location.pathname, true);
            })
            .catch(error => {
                handleErrors(error);
            })
            .finally(() => {
                closeDialog();
            });
    };

    const deleteAction = (
        <MenuAction
            key="menu-delete-action"
            id="menu-delete-action"
            icon={<DeleteIcon color="error" />}
            text={<Trans>Delete</Trans>}
            handleClick={() => handleClickDelete(itemIdParam)}
        />
    );

    const tableDeleteAction = (
        <MenuAction
            key="table-delete-action"
            id="table-delete-action"
            icon={<DeleteIcon color="error" />}
            text={<Trans>Delete</Trans>}
            handleClick={item => handleClickDelete(item.id)}
        />
    );

    const deleteEntityButton = itemId => (
        <DeleteEntityButton openDialog={() => handleClickDelete(itemId)} />
    );

    const deleteDialog = (
        <DeleteItemDialog
            isDialogOpen={isDialogOpen}
            onClose={closeDialog}
            onDelete={handleDelete}
        />
    );

    return {deleteAction, tableDeleteAction, deleteEntityButton, deleteDialog};
}
