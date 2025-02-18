import {useTable} from "base/table/hooks";
import TablePagination from "@mui/material/TablePagination";

function TableInternalPagination({count = 0, page = 0, onPageChange}) {
    const {rowsPerPage, setRowsPerPage} = useTable();

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        onPageChange(0);
    };

    return (
        <TablePagination
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-select, & .MuiTablePagination-actions, & .MuiTablePagination-displayedRows":
                    {
                        fontSize: "0.8rem",
                    },
                "& .MuiSvgIcon-root": {
                    fontSize: "1rem",
                },
                borderTop: 1,
                borderBottom: 0,
                borderColor: "grey.200",
            }}
        />
    );
}

export default TableInternalPagination;
