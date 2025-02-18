import {
    useDeleteAction,
    useEditAction,
    useMenuGenericViewAction,
} from "base/ui/menu/hooks";

export function useMenuGenericDefaultActions(service) {
    const {action: viewAction} = useMenuGenericViewAction();
    const {action: editAction} = useEditAction();
    const {action: deleteAction, dialog: deleteDialog} = useDeleteAction(service);

    const actions = [viewAction, editAction, deleteAction];

    return {actions, deleteDialog};
}
