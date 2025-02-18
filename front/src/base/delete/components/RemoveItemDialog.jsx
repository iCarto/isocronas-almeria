import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";
import {DialogLayout} from "base/dialog/components";

const RemoveItemDialog = ({isDialogOpen, setIsDialogOpen, onRemove}) => {
    const {_} = useLingui();

    const handleDialog = isOpen => {
        setIsDialogOpen(false);
    };

    const handleConfirmRemoval = () => {
        setIsDialogOpen(false);
        onRemove();
    };

    return (
        <DialogLayout
            label={_(msg`Remove item`)}
            title={_(msg`Do you want to remove this item from the list?`)}
            contentText={_(msg`The item will be removed from this list.`)}
            mainAction={{
                text: _(msg`Remove`),
                color: "warning",
                onClick: handleConfirmRemoval,
            }}
            secondaryAction={{onClick: handleDialog}}
            isDialogOpen={isDialogOpen}
        />
    );
};

export default RemoveItemDialog;
