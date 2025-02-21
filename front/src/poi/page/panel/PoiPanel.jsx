import {Trans} from "@lingui/macro";

import {EntityPanelProvider} from "base/entity/provider";

import {EntitySummaryPanel} from "base/entity/components/container";
import {SectionLayout} from "base/ui/section/layout";
import {SectionField} from "base/ui/section/components";

const PoiPanel = () => {
    const PanelData = ({element: poi = null}) => {
        return (
            <SectionLayout columns={1}>
                <SectionField
                    label={<Trans>Name</Trans>}
                    value={poi?.properties.name}
                />
            </SectionLayout>
        );
    };

    return (
        <EntityPanelProvider>
            <EntitySummaryPanel title={<Trans>POI</Trans>}>
                <PanelData />
            </EntitySummaryPanel>
        </EntityPanelProvider>
    );
};

export default PoiPanel;
