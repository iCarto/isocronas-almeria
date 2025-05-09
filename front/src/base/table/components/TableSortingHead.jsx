import {visuallyHidden} from "@mui/utils";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";

function TableSortingHead({
    order,
    attribute,
    onRequestSort = null,
    headCells,
    showActions = false,
    small = false,
}) {
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    const displayedCells = showActions ? headCells.slice(0, -1) : headCells;

    return (
        <>
            <colgroup>
                {headCells.map((headCell, index) => (
                    <col key={index} width={headCell.width + "%"} />
                ))}
            </colgroup>
            <TableHead>
                <TableRow>
                    {displayedCells.map(headCell => (
                        <Tooltip
                            key={headCell.id}
                            title={headCell.title || ""}
                            disableHoverListener={!headCell.title}
                        >
                            <TableCell
                                key={headCell.id}
                                sortDirection={
                                    attribute === headCell.id ? order : false
                                }
                                align={headCell.align || "left"}
                                sx={{
                                    paddingRight: 1,
                                    textTransform: "uppercase",
                                    fontSize: small ? "0.75rem" : "unset",
                                }}
                            >
                                {onRequestSort ? (
                                    <TableSortLabel
                                        active={attribute === headCell.id}
                                        direction={
                                            attribute === headCell.id ? order : "asc"
                                        }
                                        onClick={createSortHandler(headCell.id)}
                                        disabled={headCell.disableSorting}
                                    >
                                        {headCell.label}
                                        {attribute === headCell.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === "desc"
                                                    ? "sorted descending"
                                                    : "sorted ascending"}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                ) : (
                                    headCell.label
                                )}
                            </TableCell>
                        </Tooltip>
                    ))}
                    {showActions && <TableCell></TableCell>}
                </TableRow>
            </TableHead>
        </>
    );
}

export default TableSortingHead;
