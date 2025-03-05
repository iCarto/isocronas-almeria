import {useMapGeojsonLayerDataContext} from "base/map/layer/geojson";

import {PoiListItem} from "poi/components";
import {Spinner} from "base/shared/components";
import {ErrorAlertList} from "base/error/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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

const PoisMapGeojsonLayerFeatureList = () => {
    const {
        loading,
        error,
        elements: featureCollection,
    } = useMapGeojsonLayerDataContext();

    console.log(featureCollection);

    if (loading) return <Spinner />;

    if (error) return <ErrorAlertList errors={[error]} />;

    if (!featureCollection || !featureCollection.features?.length)
        return <NoResultsMessage />;

    return featureCollection.features.map(feature => (
        // <PoiListItem key={feature.id} feature={feature} />
        <span key={feature.id}>{feature.id}</span>
    ));
};

export default PoisMapGeojsonLayerFeatureList;
