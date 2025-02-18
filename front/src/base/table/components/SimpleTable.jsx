import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";

const SimpleTable = ({dataRows, tableColumns, lastRow = null}) => {
    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table
                aria-labelledby="Data table"
                sx={{tableLayout: "fixed"}}
                size="small"
            >
                <colgroup>
                    {tableColumns?.map((headCell, index) => (
                        <col key={index} width={headCell.width + "%"} />
                    ))}
                </colgroup>
                <TableHead>
                    <TableRow>
                        {tableColumns?.map(headCell => {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRows?.map((row, rowIndex) => {
                        return (
                            <TableRow key={rowIndex}>
                                {tableColumns?.map((headCell, cellIndex) => {
                                    return (
                                        <TableCell
                                            key={cellIndex}
                                            align={headCell.textAlign || "left"}
                                        >
                                            {headCell.formatFunction
                                                ? headCell.formatFunction(row)
                                                : row[headCell.id]}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                    {lastRow && (
                        <TableRow>
                            <TableCell colSpan={lastRow.colSpan} />
                            <TableCell
                                key="last_row_label"
                                align="right"
                                sx={{fontWeight: "600"}}
                            >
                                {lastRow.label.toUpperCase()}
                            </TableCell>
                            <TableCell key="last_row_value" align="right">
                                {lastRow.value}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SimpleTable;
