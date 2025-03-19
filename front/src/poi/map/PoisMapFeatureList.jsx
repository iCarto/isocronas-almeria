import {PoiListItem} from "poi/components";
import {Spinner} from "base/shared/components";
import {ErrorAlertList} from "base/error/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {usePoisIsochroneContext} from ".";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

const NoResultsMessage = () => {
    return (
        <Stack direction="column" alignItems="center" p={1} pt={3}>
            <Typography variant="body2" fontWeight={500} lineHeight={2}>
                No se encontró ningún resultado.
            </Typography>
            <Typography variant="body2">
                Pruebe a eliminar los filtros activos.
            </Typography>
        </Stack>
    );
};

const BoxContainer = ({children}) => (
    <Box
        sx={{
            height: "100%",
            width: "100%",
            overflowX: "auto",
        }}
    >
        {children}
    </Box>
);

const PoisMapFeatureList = () => {
    const {loading, error, listElements} = usePoisIsochroneContext();

    if (loading)
        return (
            <BoxContainer>
                <Spinner />
            </BoxContainer>
        );

    if (error)
        return (
            <BoxContainer>
                <ErrorAlertList errors={[error]} />
            </BoxContainer>
        );

    if (!listElements?.length)
        return (
            <BoxContainer>
                <NoResultsMessage />
            </BoxContainer>
        );

    return (
        <List
            sx={{
                height: "100%",
                width: "100%",
                overflowX: "auto",
            }}
        >
            {listElements.map(element => (
                <PoiListItem key={element.id} element={element} />
            ))}
        </List>
    );
};

export default PoisMapFeatureList;
