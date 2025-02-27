import {t} from "@lingui/macro";
import {PoiRepository} from "poi/repository";

import {EntityListPageProvider} from "base/entity/provider";
import {PoisMapProvider} from "poi/map";

import {usePoisTable} from "poi/shared/table";
import {EntityListPage} from "base/entity/components/container";
import {PoiFilterForm} from "poi/shared/filter";
import {PoiCard} from ".";
import {IsocronasMapControlPanel} from "app/map";

const PoiListPage = ({}) => {
    const {tableColumns} = usePoisTable();

    return (
        <EntityListPageProvider service={PoiRepository}>
            <EntityListPage
                label={{
                    singular: t`POI`,
                    plural: t`POI`,
                }}
                tableOptions={{
                    columns: tableColumns,
                    export: true,
                }}
                listOptions={{
                    card: <PoiCard />,
                }}
                mapOptions={{
                    provider: <PoisMapProvider />,
                    rightBarOptions: {component: <IsocronasMapControlPanel />},
                }}
                header={{
                    filter: <PoiFilterForm />,
                }}
            />
        </EntityListPageProvider>
    );
};
export default PoiListPage;
