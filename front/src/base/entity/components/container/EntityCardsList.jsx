import {cloneElement} from "react";
import {useEntityListPageContext} from "base/entity/provider";

import {NoContentMessage, Spinner} from "base/shared/components";
import {EntityCard} from ".";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

const pageSize = parseInt(process.env.REACT_APP_PAGE_SIZE);

const EntityCardsList = ({
    card = null,
    selectedElement = null,
    onSelectElement = null,
}) => {
    const {elements, loading, page, setPage, size} = useEntityListPageContext();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const entityCards = elements.map(element => {
        return (
            <Grid item xs={12} sm={6} md={4} xl={3} key={element.id}>
                {card ? (
                    cloneElement(card, {key: element.id, element: element})
                ) : (
                    <EntityCard
                        key={element.id}
                        element={element}
                        onClick={onSelectElement}
                        selected={selectedElement === element.id}
                    />
                )}
            </Grid>
        );
    });

    const noElements = !size && !elements?.length;

    return (
        <>
            {loading ? (
                <Spinner />
            ) : noElements ? (
                <NoContentMessage />
            ) : (
                <>
                    <Grid
                        component="ul"
                        container
                        spacing={3}
                        sx={{
                            display: "flex",
                            justifyContent: "left",
                            p: 0,
                            listStyleType: "none",
                        }}
                    >
                        {entityCards}
                    </Grid>
                    {page && (
                        <Grid container justifyContent="flex-end" sx={{mt: 3}}>
                            <Pagination
                                count={Math.ceil(size / pageSize)}
                                page={page}
                                onChange={handleChangePage}
                            />
                        </Grid>
                    )}
                </>
            )}
        </>
    );
};

export default EntityCardsList;
