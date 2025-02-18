import {cloneElement} from "react";

import {useEntityListPageContext} from "base/entity/provider";
import {useTable} from "base/table/hooks";

import {TableCustomCell, TableSortingHead} from "base/table/components";
import {AuthAction} from "base/user/components";
import {ActionsMenu} from "base/ui/menu";
import {NoContentMessage, Spinner} from "base/shared/components";
import {EntityTableDownloadButton} from "../presentational";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const pageSize = parseInt(process.env.REACT_APP_PAGE_SIZE);

const tableRowStyle = {
    cursor: "pointer",
};

const EntityTable = ({
    columns,
    selectedElement = null,
    onSelectElement = null,
    elementActions = [],
    getCellProps = null,
    showExport = false,
}) => {
    const {elements, loading, page, setPage, size, sort, setSort, order, setOrder} =
        useEntityListPageContext();
    const {headCells, getValue} = useTable(elements, columns, elementActions?.length);

    const handleSelectElement = (event, element) => {
        const cellIndex = event.target.cellIndex;
        if (
            cellIndex !== undefined &&
            cellIndex !== columns.length &&
            onSelectElement
        ) {
            onSelectElement(element.id);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = sort === property && order === "asc";
        setSort(property);
        setOrder(isAsc ? "desc" : "asc");
        setSort(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const getValueNote = (cellAttribute, element) => {
        return cellAttribute.note ? cellAttribute.note(element) : null;
    };

    const noElements = !size && !elements?.length;

    return (
        <>
            {loading ? (
                <Spinner />
            ) : noElements ? (
                <NoContentMessage />
            ) : (
                elements && (
                    <TableContainer sx={{width: "100%"}}>
                        <Table
                            aria-labelledby="Tabla"
                            size="small"
                            sx={{tableLayout: "fixed"}}
                        >
                            <TableSortingHead
                                order={order}
                                attribute={sort}
                                onRequestSort={handleRequestSort}
                                headCells={headCells}
                                showActions={elementActions?.length > 0}
                            />
                            <TableBody>
                                {elements?.map((element, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={index}
                                            sx={tableRowStyle}
                                            selected={selectedElement === element.id}
                                            onClick={event =>
                                                handleSelectElement(event, element)
                                            }
                                        >
                                            {columns.map((cellAttribute, index) => {
                                                const valueNote = getValueNote(
                                                    cellAttribute,
                                                    element
                                                );
                                                return (
                                                    <TableCustomCell
                                                        key={index}
                                                        id={cellAttribute.id}
                                                        TableCellProps={
                                                            getCellProps
                                                                ? getCellProps(element)
                                                                : null
                                                        }
                                                    >
                                                        {cellAttribute.formatFunction
                                                            ? cellAttribute.formatFunction(
                                                                  element
                                                              )
                                                            : getValue(
                                                                  element,
                                                                  cellAttribute.id
                                                              )}
                                                        {valueNote ? (
                                                            <Tooltip title={valueNote}>
                                                                <Typography component="span">
                                                                    {" "}
                                                                    *
                                                                </Typography>
                                                            </Tooltip>
                                                        ) : null}
                                                    </TableCustomCell>
                                                );
                                            })}
                                            {elementActions?.length ? (
                                                <TableCell>
                                                    <AuthAction roles={[]}>
                                                        <ActionsMenu>
                                                            {elementActions.map(
                                                                actionMenu =>
                                                                    cloneElement(
                                                                        actionMenu,
                                                                        {
                                                                            element,
                                                                        }
                                                                    )
                                                            )}
                                                        </ActionsMenu>
                                                    </AuthAction>
                                                </TableCell>
                                            ) : null}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {page && (
                            <Grid
                                container
                                justifyContent={
                                    showExport ? "space-between" : "flex-end"
                                }
                                sx={{mt: 3}}
                            >
                                {showExport && (
                                    <Grid item>
                                        <EntityTableDownloadButton
                                            sort={sort}
                                            order={order}
                                        />
                                    </Grid>
                                )}
                                <Grid item>
                                    <Pagination
                                        count={Math.ceil(size / pageSize)}
                                        page={page}
                                        onChange={handleChangePage}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </TableContainer>
                )
            )}
        </>
    );
};

export default EntityTable;
