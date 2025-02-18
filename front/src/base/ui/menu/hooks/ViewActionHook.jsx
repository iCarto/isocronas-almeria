import {cloneElement, useState} from "react";

import {useDialog} from "base/dialog/hooks";
import {EntityManageDialog} from "base/entity/components/container";

export function useViewAction(view) {
    const {isDialogOpen, openDialog, closeDialog} = useDialog();
    const [itemData, setItemData] = useState(null);

    const handleClickElement = item => {
        setItemData(item);
        openDialog();
    };

    const handleCloseDialog = () => {
        closeDialog();
    };

    const viewDialog = (
        <EntityManageDialog
            dialogContent={cloneElement(view, {
                element: itemData,
            })}
            isDialogOpen={isDialogOpen}
            onCloseDialog={handleCloseDialog}
            style={{backgroundColor: "none"}}
        />
    );

    return {handleClickElement, viewDialog};
}
