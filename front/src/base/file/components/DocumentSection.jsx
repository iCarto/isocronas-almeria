import {Trans} from "@lingui/macro";

import {FileUtil} from "base/file/utilities";
import {useDateUtil} from "base/i18n/utils";

import {SectionCard, SectionField} from "base/ui/section/components";
import {ImagePreview} from "base/image/components";
import {SectionLayout} from "base/ui/section/layout";
import Box from "@mui/material/Box";

const DocumentSection = ({folderElement}) => {
    const {formatDateTime} = useDateUtil();

    return (
        folderElement && (
            <SectionCard title={folderElement.name}>
                {folderElement.content_type.startsWith("image") && (
                    <Box sx={{mb: 3}}>
                        <ImagePreview
                            path={folderElement.url}
                            alt={folderElement.name}
                        />
                    </Box>
                )}
                <SectionLayout columns={1}>
                    <SectionField
                        label={<Trans>File size</Trans>}
                        value={FileUtil.formatBytes(folderElement.size)}
                    />
                    <SectionField
                        label={<Trans>File type</Trans>}
                        value={folderElement?.content_type}
                    />
                    <SectionField
                        label={<Trans>Upload date</Trans>}
                        value={formatDateTime(folderElement?.created_at)}
                    />
                    <SectionField
                        label={<Trans>Uploaded by</Trans>}
                        value={folderElement.creation_user}
                    />
                </SectionLayout>
            </SectionCard>
        )
    );
};

export default DocumentSection;
