import {cloneElement} from "react";
import {useParams} from "react-router-dom";
import {Trans} from "@lingui/macro";

import {useNavigateWithReload} from "base/navigation/hooks";
import {useErrors} from "base/error/provider";
import {useDialog} from "base/dialog/hooks";

import {EntityManageDialog} from "base/entity/components/container";
import {AddNewInlineItemButton} from "base/shared/components";
import Grid from "@mui/material/Grid";

export function useCreateAction(config) {
    const {
        service,
        entityForm,
        entityName,
        parentEntityName,
        paramIdAttribute = "id",
        path = null,
    } = config;

    const params = useParams();
    const parentEntityId = params[paramIdAttribute];
    const {isDialogOpen, openDialog, closeDialog} = useDialog();
    const {handleErrors} = useErrors();
    const navigate = useNavigateWithReload();

    const handleFormSubmit = item => {
        return service
            .create({...item, [parentEntityName]: parentEntityId})
            .then(createdItem => {
                navigate(path ? path(createdItem) : "", true);
            })
            .catch(error => {
                handleErrors(error);
            });
    };

    const createButton = (
        <AddNewInlineItemButton
            onClick={() => {
                openDialog();
            }}
            label={<Trans>Add new</Trans>}
        />
    );

    const createButtonLarge = (
        <Grid container justifyContent="center">
            <AddNewInlineItemButton
                onClick={() => {
                    openDialog();
                }}
                label={<Trans>Add new</Trans>}
                size="large"
            />
        </Grid>
    );

    const createDialog = (
        <EntityManageDialog
            dialogTitle={<Trans>{`Create ${entityName.toLowerCase()}`}</Trans>}
            dialogContent={
                entityForm
                    ? cloneElement(entityForm, {
                          onSubmit: handleFormSubmit,
                          onCancel: () => {
                              closeDialog();
                          },
                      })
                    : null
            }
            isDialogOpen={isDialogOpen}
        />
    );

    return {createButton, createButtonLarge, createDialog, handleFormSubmit};
}
