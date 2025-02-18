import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";
import {DialogLayout} from "base/dialog/components";

const DeleteItemDialog = ({isDialogOpen, onClose, onDelete}) => {
    const {_} = useLingui();

    const handleDialog = isOpen => {
        onClose();
    };

    const handleConfirmDeletion = () => {
        onDelete();
    };

    return (
        <DialogLayout
            label={_(msg`Delete item`)}
            title={_(msg`Are you sure you want to permanently delete this item?`)}
            contentText={_(msg`If you click Delete, the item cannot be recovered.`)}
            mainAction={{
                text: _(msg`Delete`),
                color: "error",
                onClick: handleConfirmDeletion,
            }}
            secondaryAction={{onClick: handleDialog}}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default DeleteItemDialog;
