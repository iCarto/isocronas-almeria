import {Outlet} from "react-router-dom";
import {ListPageGroupProvider} from "base/ui/page/provider";

const EntityListPageGroup = ({path, defaultFilter = null}) => {
    return (
        <ListPageGroupProvider path={path} defaultFilter={defaultFilter}>
            <Outlet />
        </ListPageGroupProvider>
    );
};

export default EntityListPageGroup;
