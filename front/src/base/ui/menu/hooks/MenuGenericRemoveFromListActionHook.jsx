import {useState} from "react";
import {Trans} from "@lingui/macro";

import {useNavigateWithReload} from "base/navigation/hooks";
import {useErrors} from "base/error/provider";

import {MenuAction} from "base/ui/menu";
import {ErrorAlerts} from "base/error/components";
import {RemoveItemDialog} from "base/delete/components";

import LinkOffIcon from "@mui/icons-material/LinkOff";

export function useMenuGenericRemoveFromListAction(
    entity,
    entityAttribute,
    service,
    createEntityObject,
    entityAttributeId = "id"
) {
    const navigate = useNavigateWithReload();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const {handleErrors, clearErrors} = useErrors();

    const subEntityList = entity[entityAttribute];

    const handleClickRemove = element => {
        console.log({element});
        setIsRemoveDialogOpen(true);
        if (entityAttribute) {
            setItemToRemove(
                subEntityList.findIndex(
                    item => item[entityAttributeId] === element[entityAttributeId]
                )
            );
        }
    };

    const handleRemove = () => {
        clearErrors();

        subEntityList.splice(itemToRemove, 1);
        const newEntityObject = createEntityObject({
            ...entity,
            [`${entityAttribute}`]: [...subEntityList],
        });
        console.log({newEntityObject});

        service
            .update(newEntityObject)
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
