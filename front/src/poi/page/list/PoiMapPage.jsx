import {PoisMapProvider} from "poi/map";

import {EntityMapPage} from "base/entity/components/container";
import {IsocronasMapControlPanel} from "app/map";
import {DrawerHeader} from "base/ui/module/menu/ModuleMenu";
import Box from "@mui/material/Box";

const PoiMapPage = ({}) => {
    // TO-DO: Quitar elementos de layout si finalmente solo se deja el visor sin header ni nada más
    return (
        <Box sx={{display: "flex"}} role="main">
            <Box sx={{flexGrow: 1}} role="module">
                <DrawerHeader role="drawer-header" />
                <EntityMapPage
                    mapOptions={{
                        provider: <PoisMapProvider />,
                        rightBarOptions: {component: <IsocronasMapControlPanel />},
                    }}
                />
            </Box>
        </Box>
    );
};
export default PoiMapPage;
