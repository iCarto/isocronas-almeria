import {useState, useEffect, cloneElement} from "react";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {useEntityListPageContext} from "base/entity/provider";
import {PageProvider, useListPageGroupContext} from "base/ui/page/provider";

import {PageLayout} from "base/ui/page/layout";
import {PaperContainer} from "base/ui/containers";
import {ErrorAlerts} from "base/error/components";
import {EntityListMap, EntityListPageHeader} from "../presentational";
import {EntityCardsList, EntityTable} from ".";

import Grid from "@mui/material/Grid";

const EntityListPage = ({
    label,
    table = null,
    tableOptions: {
        columns: columnsTable = [],
        getCellProps: getCellPropsTable = () => {},
        show: showTable = true,
        export: showExport = false,
    } = {},
    list = null,
    listOptions: {card: cardList = null, show: showList = true} = {},
    map = null,
    mapOptions: {provider: providerMap, show: showMap = true} = {
        provider: null,
    },
    header: {search = null, filter = null, counter = null, create = null} = {},
}) => {
    // Why are we using nested props insted of render props?
    /*
    https://medium.com/trabe/passing-elements-as-props-in-react-54f9841ec0c9
    Render props are as powerful as it can get but they also come with their own nuances.
    They’re kind of an all or nothing approach. They let you change how you render the component
    but it’s not easy to reuse the “defaults”. It depends on what your render prop renders.
    In the previous examples we saw three levels,
    each allowing more flexibility but less reusability of the “defaults”.
    */
    const navigate = useNavigateWithReload();
    const {basePath} = useListPageGroupContext();
    const {idInfoPanel} = useParams();

    const {view, selectedElement, setSelectedElement} = useEntityListPageContext();

    const [views, setViews] = useState([]);

    useEffect(() => {
        let views = [];
        if (showTable) {
            views.push("table");
        }
        if (showList) {
            views.push("list");
        }
        if (showMap && providerMap) {
            views.push("map");
        }
        setViews([...views]);
    }, []);

    const handleSelectElement = elementId => {
        setSelectedElement(elementId);
        navigate(`${basePath}/info/${elementId}`);
    };

    useEffect(() => {
        // If the sidebar panel is open we must highlight the element
        setSelectedElement(idInfoPanel ? parseInt(idInfoPanel) : null);
    }, [idInfoPanel]);

    const getViewComponent = () => {
        if (view === "map") {
            return map
                ? cloneElement(map)
                : providerMap &&
                      showMap &&
                      cloneElement(providerMap, null, <EntityListMap />);
        }
        if (view === "list") {
            return list
                ? cloneElement(list, {
                      selectedElement,
                      onSelectElement: handleSelectElement,
                  })
                : showList && (
                      <EntityCardsList
                          card={cardList}
                          selectedElement={selectedElement}
                          onSelectElement={handleSelectElement}
                      />
                  );
        }
        return table
            ? cloneElement(table, {
                  columns: columnsTable,
                  getCellProps: getCellPropsTable,
                  selectedElement,
                  onSelectElement: handleSelectElement,
                  showExport,
              })
            : showTable && (
                  <EntityTable
                      selectedElement={selectedElement}
                      onSelectElement={handleSelectElement}
                      columns={columnsTable}
                      getCellProps={getCellPropsTable}
                      showExport={showExport}
                  />
              );
    };

    return (
        <PageProvider>
            <PageLayout>
                <PaperContainer>
                    <EntityListPageHeader
                        basePath={basePath}
                        label={label}
                        search={search}
                        filter={filter}
                        counter={counter}
                        create={create}
                        views={views}
                    />
                    <ErrorAlerts />
                    <Grid item xs={12} sx={{mt: 3}}>
                        {getViewComponent()}
                    </Grid>
                </PaperContainer>
            </PageLayout>
        </PageProvider>
    );
};
export default EntityListPage;
