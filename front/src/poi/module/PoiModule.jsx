import {ModuleLayout} from "base/ui/module/components";
import {ModuleProvider} from "base/ui/module/provider";

const PoiModule = ({path}) => {
    return (
        <ModuleProvider path={path}>
            <ModuleLayout />
        </ModuleProvider>
    );
};

export default PoiModule;
