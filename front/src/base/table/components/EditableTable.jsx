import {useState} from "react";
import {useFormContext} from "react-hook-form";
import {useLingui} from "@lingui/react";
import {msg} from "@lingui/macro";
import {AddNewInlineItemButton} from "base/shared/components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import EditableTableRow from "./EditableTableRow";

const EditableTable = ({data, columns, getCells, disabled, onSubmit, onDelete}) => {
    const {_} = useLingui();

    const {getValues} = useFormContext();
    const [tableData, setTableData] = useState(data);

    const handleAdd = () => {
        const defaultValues = getValues();
        const newEntry = {
            ...defaultValues,
            id: null,
            isNew: true,
        };
        setTableData([...tableData, newEntry]);
    };

    const handleCancel = () => {
        if (isEmptyOrNew(tableData[tableData.length - 1]))
            setTableData(tableData.slice(0, -1));
    };

    const isEmptyOrNew = obj => {
        return Object.entries(obj).every(([key, value]) => key === "isNew" || !value);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns?.map(headCell => {
                            return (
                                <Tooltip
                                    key={headCell.id}
                                    title={headCell.title || ""}
                                    disableHoverListener={!headCell.title}
                                >
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.textAlign || "left"}
                                        sx={{
                                            color: "grey.600",
                                            paddingRight: 1,
                                        }}
                                    >
                                        {headCell.label}
                                    </TableCell>
                                </Tooltip>
                            );
                        })}
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData?.map((item, index) => (
                        <EditableTableRow
                            key={index}
                            item={item}
                            getCells={getCells}
                            onSave={onSubmit}
                            onDelete={onDelete}
                            onCancel={handleCancel}
                            disabled={disabled}
                        />
                    ))}
                </TableBody>
            </Table>
            <AddNewInlineItemButton
                onClick={handleAdd}
                label={_(msg`Add`)}
                disabled={disabled}
            />
        </TableContainer>
    );
};

export default EditableTable;
