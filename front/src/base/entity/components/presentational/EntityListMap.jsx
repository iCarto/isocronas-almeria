import {useEffect} from "react";
import {useMapContext} from "base/map";
import {MapBaseLayout} from "base/map/layout";
import {useScopedFilters} from "base/filter/hooks";

const EntityListMap = ({rightBarOptions}) => {
    const {filter} = useScopedFilters({defaultFilter: null, scope: "map"});
    const {updateMapFilter} = useMapContext();

    useEffect(() => {
        updateMapFilter(filter);
    }, [filter]);

    return <MapBaseLayout rightBarOptions={rightBarOptions} />;
};

export default EntityListMap;
