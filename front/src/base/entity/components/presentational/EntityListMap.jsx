import {useEffect} from "react";
import {useMapContext} from "base/map";
import {MapBaseLayout} from "base/map/layout";
import {useListPageGroupContext} from "base/ui/page/provider";

const EntityListMap = ({rightBarOptions}) => {
    const {pageGroupFilter} = useListPageGroupContext();
    const {updateMapFilter} = useMapContext();

    useEffect(() => {
        updateMapFilter(pageGroupFilter);
    }, [pageGroupFilter]);

    return <MapBaseLayout rightBarOptions={rightBarOptions} />;
};

export default EntityListMap;
