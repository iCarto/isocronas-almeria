import TableCell from "@mui/material/TableCell";

function TableCustomCell({id, TableCellProps, style = {}, children}) {
    return (
        <TableCell key={id} {...TableCellProps} style={style}>
            {children}
        </TableCell>
    );
}

export default TableCustomCell;
