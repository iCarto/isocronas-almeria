import {cloneElement} from "react";

import {PageProvider} from "base/ui/page/provider";

import {PageLayout} from "base/ui/page/layout";
import {PaperContainer} from "base/ui/containers";
import {ErrorAlerts} from "base/error/components";
import {EntityListMap} from "base/entity/components/presentational";

const EntityMapPage = ({
    mapOptions: {provider: providerMap, rightBarOptions: mapRightBarOptions = null} = {
        provider: null,
    },
}) => {
    return (
        <PageProvider>
            <PageLayout>
                <PaperContainer>
                    <ErrorAlerts />
                    {cloneElement(
                        providerMap,
                        null,
                        <EntityListMap rightBarOptions={mapRightBarOptions} />
                    )}
                </PaperContainer>
            </PageLayout>
        </PageProvider>
    );
};
export default EntityMapPage;
