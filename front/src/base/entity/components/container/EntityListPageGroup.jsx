import {Outlet} from "react-router-dom";
import {ListPageGroupProvider} from "base/ui/page/provider";

const EntityListPageGroup = ({path, defaultFilter = null, urlParamsConfig}) => {
    return (
        <ListPageGroupProvider
            path={path}
            defaultFilter={defaultFilter}
            urlParamsConfig={urlParamsConfig}
        >
            <Outlet />
        </ListPageGroupProvider>
    );
};

export default EntityListPageGroup;
