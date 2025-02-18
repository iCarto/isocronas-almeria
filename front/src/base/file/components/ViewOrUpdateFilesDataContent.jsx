import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";
import {ListTableFolder} from "base/file/components";
import {SectionCard} from "base/ui/section/components";

const ViewOrUpdateFilesDataContent = ({folderPath}) => {
    const {_} = useLingui();

    return (
        <SectionCard title={_(msg`Attached files`)}>
            <ListTableFolder folderPath={folderPath} basePath={""} />
        </SectionCard>
    );
};

export default ViewOrUpdateFilesDataContent;
