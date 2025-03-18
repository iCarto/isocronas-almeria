import {useCallback, useState, useRef, useEffect, useMemo} from "react";
import {VariableSizeList as List} from "react-window";

import {useContainerHeight} from "base/ui/hooks";
import {useMapContext} from "base/map";

import {PoiListItem, PoiListItemWithMeasure} from "poi/components";
import {Spinner} from "base/shared/components";
import {ErrorAlertList} from "base/error/components";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {usePoisIsochroneContext} from ".";

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

const MAX_ITEMS_WITHOUT_VIRTUALIZATION = 100;
const DEFAULT_HEIGHT_COLLAPSED = 60;
const DEFAULT_HEIGHT_EXPANDED = 200;

const PoisMapFeatureList = () => {
    const {loading, error, filteredElements: pois} = usePoisIsochroneContext();
    console.log({pois});
    const {showToc} = useMapContext();

    const [expandedItem, setExpandedItem] = useState({
        featureId: null,
        isExpanded: false,
    });
    const listRef = useRef(null);
    const itemHeightsRef = useRef({});

    const {containerRef, containerHeight} = useContainerHeight();

    useEffect(() => {
        if (listRef.current && expandedItem.featureId) {
            const index = pois.findIndex(f => f.id === expandedItem.featureId);
            if (index >= 0) {
                listRef.current.resetAfterIndex(index);
            }
        }
    }, [expandedItem, pois]);

    useEffect(() => {
        if (listRef.current) {
            itemHeightsRef.current = {};
            const visibleItems = Math.ceil(containerHeight / DEFAULT_HEIGHT_COLLAPSED);
            listRef.current.resetAfterIndex(visibleItems);
        }
    }, [showToc, containerHeight]);

    const updateItemHeight = useCallback(
        (id, expanded, height) => {
            const key = `${id}-${expanded ? "expanded" : "collapsed"}`;
            if (itemHeightsRef.current[key] !== height) {
                itemHeightsRef.current[key] = height;

                if (listRef.current && pois) {
                    const index = pois.findIndex(feature => feature.id === id);
                    if (index >= 0) {
                        listRef.current.resetAfterIndex(index);
                    }
                }
            }
        },
        [pois]
    );

    const getIsItemExpanded = (features, expandedItem, index) => {
        const feature = features[index];
        const isExpanded =
            expandedItem.featureId === feature.id && expandedItem.isExpanded;
        return {feature, isExpanded};
    };

    const getItemHeight = useCallback(
        index => {
            const {feature, isExpanded} = getIsItemExpanded(pois, expandedItem, index);

            const key = `${feature.id}-${isExpanded ? "expanded" : "collapsed"}`;
            return (
                itemHeightsRef.current[key] ||
                (isExpanded ? DEFAULT_HEIGHT_EXPANDED : DEFAULT_HEIGHT_COLLAPSED)
            );
        },
        [pois, expandedItem]
    );

    const Row = ({index, style}) => {
        const {feature, isExpanded} = getIsItemExpanded(pois, expandedItem, index);

        return (
            <Box sx={{...style}} key={feature.id} role="listitem">
                <PoiListItemWithMeasure
                    feature={feature}
                    isExpanded={isExpanded}
                    onExpand={(event, isExpanded) =>
                        handleExpand(feature.id, isExpanded)
                    }
                    onHeightChange={updateItemHeight}
                />
            </Box>
        );
    };

    const handleExpand = useCallback((featureId, isExpanded) => {
        setExpandedItem({featureId, isExpanded});
    }, []);

    if (loading) return <Spinner />;

    if (error) return <ErrorAlertList errors={[error]} />;

    if (!pois?.length) return <NoResultsMessage />;

    return (
        <Box
            ref={containerRef}
            role="list"
            sx={{
                height: "100%",
                width: "100%",
                overflowX: "auto",
            }}
        >
            {pois.length <= MAX_ITEMS_WITHOUT_VIRTUALIZATION ? (
                pois.map(feature => (
                    <PoiListItem
                        key={feature.id}
                        feature={feature}
                        isExpanded={
                            expandedItem.featureId === feature.id
                                ? expandedItem.isExpanded
                                : false
                        }
                        onExpand={(event, isExpanded) =>
                            handleExpand(feature.id, isExpanded)
                        }
                    />
                ))
            ) : (
                <List
                    ref={listRef}
                    height={containerHeight}
                    width="100%"
                    itemCount={pois}
                    overscanCount={3}
                >
                    {Row}
                </List>
            )}
        </Box>
    );
};

export default PoisMapFeatureList;
