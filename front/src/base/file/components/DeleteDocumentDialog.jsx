import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import {useErrors} from "base/error/provider";
import {DocumentService} from "../service";

import {DialogLayout} from "base/dialog/components";

const DeleteDocumentDialog = ({
    folderElement,
    onDeletedFolderElement = null,
    isDialogOpen,
    setIsDialogOpen,
}) => {
    const {_} = useLingui();
    const {handleErrors} = useErrors();

    const handleDialog = isOpen => {
        setIsDialogOpen(false);
    };

    const handleConfirmDeletion = () => {
        setIsDialogOpen(false);

        DocumentService.delete(folderElement.path)
            .then(() => {
                if (onDeletedFolderElement) {
                    onDeletedFolderElement();
                }
            })
            .catch(error => {
                handleErrors(error);
            });
    };

    return (
        <DialogLayout
            label={_(msg`Delete file`)}
            title={_(msg`Are you sure you want to permanently delete this file?`)}
            contentText={_(msg`If you click Delete, the file cannot be recovered.`)}
            mainAction={{
                color: "error",
                text: _(msg`Delete`),
                onClick: handleConfirmDeletion,
            }}
            secondaryAction={{onClick: handleDialog}}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DeleteDocumentDialog;
