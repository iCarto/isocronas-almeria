import {useNavigate} from "react-router-dom";
import {msg} from "@lingui/macro";
import {i18n} from "@lingui/core";

import {FileUtil} from "base/file/utilities";
import {useSort} from "base/table/hooks";
import {useDownloadDocument} from "../utilities";

import {TableSortingHead} from "base/table/components";
import {FolderElementIcon} from ".";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const columns = [
    {
        id: "icon",
        label: "",
        width: 5,
    },
    {
        id: "name",
        label: i18n._(msg`Name`),
        width: 40,
    },
    {
        id: "content_type",
        label: i18n._(msg`Type`),
        width: 35,
    },
    {
        id: "size",
        label: i18n._(msg`Size`),
        width: 20,
    },
];

const FolderTable = ({basePath, folderElements, selectedElement, onSelectElement}) => {
    const navigate = useNavigate();
    const downloadDocument = useDownloadDocument();

    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "name",
        "asc"
    );

    const handleRequestSort = (event, property) => {
        const isAsc = attribute === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setAttribute(property);
    };

    const handleClick = async folderElement => {
        if (onSelectElement) {
            onSelectElement(folderElement);
        }
    };

    const handleDoubleClick = async folderElement => {
        if (folderElement.content_type) {
            downloadDocument(
                folderElement.name,
                folderElement.path,
                folderElement.content_type
            );
        } else {
            navigate(basePath + folderElement.path);
        }
    };

    const pointer = {cursor: "pointer"};

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table
                sx={{tableLayout: "fixed"}}
                aria-labelledby="Files table"
                size="small"
            >
                <TableSortingHead
                    order={order}
                    attribute={attribute}
                    onRequestSort={handleRequestSort}
                    headCells={columns}
                />
                <TableBody>
                    {folderElements.sort(sortFunction).map((folderElement, index) => {
                        return (
                            <TableRow
                                hover
                                key={index}
                                selected={selectedElement?.name === folderElement.name}
                                onClick={() => handleClick(folderElement)}
                                onDoubleClick={() => handleDoubleClick(folderElement)}
                            >
                                <TableCell>
                                    <FolderElementIcon element={folderElement} />
                                </TableCell>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={pointer}
                                    sx={{
                                        color: folderElement.content_type
                                            ? "inherit"
                                            : "primary.main",
                                        fontWeight: folderElement.content_type
                                            ? "inherit"
                                            : "500",
                                    }}
                                >
                                    {folderElement.name}
                                </TableCell>
                                <TableCell style={pointer}>
                                    {folderElement.content_type}
                                </TableCell>
                                <TableCell style={pointer}>
                                    {folderElement.size &&
                                        FileUtil.formatBytes(folderElement.size)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FolderTable;
