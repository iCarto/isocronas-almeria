import {useEffect, useRef} from "react";
import {PoiListItem} from ".";

const PoiListItemWithMeasure = ({feature, isExpanded, onExpand, onHeightChange}) => {
    const itemRef = useRef(null);

    useEffect(() => {
        if (itemRef.current) {
            const height = itemRef.current.getBoundingClientRect().height;
            onHeightChange(feature.id, isExpanded, height);
        }
    }, [feature.id, isExpanded, onHeightChange]);

    return (
        <div ref={itemRef}>
            <PoiListItem
                key={feature.id}
                feature={feature}
                isExpanded={isExpanded}
                onExpand={onExpand}
            />
        </div>
    );
};

export default PoiListItemWithMeasure;
