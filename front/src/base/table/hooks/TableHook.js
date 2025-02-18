import {useMemo, useState} from "react";

function useTable(rows, columns, rowActions, showTotals) {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const headCells = rowActions
        ? [
              ...columns,
              {
                  id: "actions",
                  width: 7,
              },
          ]
        : columns;

    const emptyRows = useMemo(
        () => Math.max(0, (1 + page) * rowsPerPage - rows?.length),
        [page, rowsPerPage, rows]
    );

    const totalsColumns = useMemo(() => {
        if (!showTotals || columns?.length === 0) return;
        return columns.map(column => {
            if (column.calculateTotal) {
                return rows?.reduce((sum, row) => sum + (row[column.id] || 0), 0);
            } else {
                return null;
            }
        });
    }, [columns, rows, showTotals]);

    const getValue = (obj, path) => {
        for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
            if (!obj[path[i]]) {
                return null;
            }
            obj = obj[path[i]];
        }
        return obj;
    };

    return {
        page,
        handleChangePage,
        rowsPerPage,
        setRowsPerPage,
        emptyRows,
        getValue,
        headCells,
        totalsColumns,
    };
}

export {useTable};
