import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import {useMapLayerDiscriminatorContext} from "../layer/geojson/MapGeojsonLayerDiscriminatorProvider";
import {MapLegendTOCDiscriminatorItem} from ".";

const MapLegendTOCDiscriminator = () => {
    const {selectedDiscriminator} = useMapLayerDiscriminatorContext();

    return (
        selectedDiscriminator && (
            <List dense={true} className="LayerMenuDiscriminatorInfo">
                <ListSubheader className="LayerMenuDiscriminatorInfoHeader">
                    {selectedDiscriminator.name}
                </ListSubheader>
                {selectedDiscriminator.entries.map(discriminatorItem => (
                    <MapLegendTOCDiscriminatorItem
                        key={discriminatorItem.code}
                        discriminator={selectedDiscriminator}
                        discriminatorItem={discriminatorItem}
                    />
                ))}
            </List>
        )
    );
};

export default MapLegendTOCDiscriminator;
