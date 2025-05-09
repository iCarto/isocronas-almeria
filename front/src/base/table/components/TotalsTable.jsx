import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";

export const TABLE_ROW_STYLE = {
    "&:last-child td, &:last-child th": {
        borderTop: "solid 1px #c0c4c2",
        fontWeight: "bold",
        backgroundColor: "grey.50",
    },
};

const TotalsTable = ({dataRows, tableColumns, small = false}) => {
    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table
                aria-labelledby="Totals table"
                sx={{tableLayout: "fixed"}}
                size={small ? "small" : "medium"}
            >
                <colgroup>
                    {tableColumns.map((headCell, index) => (
                        <col key={index} width={headCell.width + "%"} />
                    ))}
                </colgroup>
                <TableHead>
                    <TableRow>
                        {tableColumns.map(headCell => {
                            return (
                                <Tooltip
                                    key={headCell.id}
                                    title={headCell.title || ""}
                                    disableHoverListener={!headCell.title}
                                >
                                    <TableCell
                                        key={headCell.id}
                                        sx={{
                                            paddingRight: 1,
                                            textAlign: "center",
                                            fontSize: "0.75rem",
                                        }}
                                    >
                                        {headCell.label}
                                    </TableCell>
                                </Tooltip>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRows?.id?.map((row, rowIndex) => (
                        <TableRow key={rowIndex} hover sx={TABLE_ROW_STYLE}>
                            {tableColumns.map((headCell, cellIndex) => {
                                return (
                                    <TableCell
                                        key={cellIndex}
                                        align="center"
                                        sx={{fontSize: "0.75rem"}}
                                    >
                                        {headCell.formatFunction
                                            ? headCell.formatFunction(
                                                  dataRows[headCell.id][rowIndex]
                                              )
                                            : dataRows[headCell.id][rowIndex]}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TotalsTable;
