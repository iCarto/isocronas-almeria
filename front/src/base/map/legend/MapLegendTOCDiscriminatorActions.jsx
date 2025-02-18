import {useMapLayerDiscriminatorContext} from "../layer/geojson/MapGeojsonLayerDiscriminatorProvider";

import ListSubheader from "@mui/material/ListSubheader";
import CheckIcon from "@mui/icons-material/Check";
import {MenuAction} from "base/ui/menu";

const MapLegendTOCDiscriminatorActions = () => {
    const {discriminators, selectedDiscriminator, setSelectedDiscriminator} =
        useMapLayerDiscriminatorContext();

    const getMenuAction = discriminator => {
        return (
            <MenuAction
                id={`view-${discriminator.field}`}
                key={`view-${discriminator.field}`}
                icon={
                    discriminator.field === selectedDiscriminator?.field ? (
                        <CheckIcon />
                    ) : null
                }
                text={discriminator.name}
                handleClick={() => setSelectedDiscriminator(discriminator)}
            />
        );
    };

    console.log({discriminators});
    return (
        discriminators &&
        discriminators.length > 1 && (
            <>
                <ListSubheader component="div" id="nested-list-subheader">
                    Simboloxía por
                </ListSubheader>
                {discriminators.map(discriminator => getMenuAction(discriminator))}
            </>
        )
    );
};

export default MapLegendTOCDiscriminatorActions;
