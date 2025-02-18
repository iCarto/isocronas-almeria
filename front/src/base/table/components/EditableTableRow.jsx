import {useState} from "react";
import {useFormContext} from "react-hook-form";
import {Trans} from "@lingui/macro";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";

const EditableTableRow = ({item, onSave, getCells, onDelete, onCancel, disabled}) => {
    const [isEditing, setIsEditing] = useState(item.isNew || false);
    const [isSaving, setIsSaving] = useState(false);

    const cells = getCells(item);

    const {handleSubmit} = useFormContext();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = formData => {
        onSave(formData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(item.id);
    };

    const handleCancel = () => {
        onCancel();
        setIsEditing(false);
    };

    return (
        <TableRow>
            {cells.map((field, index) => (
                <TableCell key={index} align={field.align || "inherit"}>
                    {isEditing ? field.input : field.value}
                </TableCell>
            ))}

            <TableCell>
                {isEditing ? (
                    <>
                        <Tooltip title={<Trans>Save</Trans>}>
                            <IconButton
                                onClick={handleSubmit(handleSave)}
                                disabled={isSaving || disabled}
                            >
                                {isSaving ? (
                                    <CircularProgress size={15} sx={{ml: 1}} />
                                ) : (
                                    <SaveOutlinedIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<Trans>Cancel</Trans>}>
                            <IconButton
                                onClick={handleCancel}
                                disabled={disabled}
                                size="small"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title={<Trans>Edit</Trans>}>
                            <IconButton
                                onClick={handleEdit}
                                disabled={disabled}
                                size="small"
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<Trans>Delete</Trans>}>
                            <IconButton
                                onClick={handleDelete}
                                disabled={disabled}
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </TableCell>
        </TableRow>
    );
};

export default EditableTableRow;
