import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {msg, Trans} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import {useAuth} from "base/user/provider";
import {useErrors} from "base/error/provider";
import {useFolderView} from "base/file/provider";
import {DocumentService} from "base/file/service";
import {useDownloadDocument} from "base/file/utilities";

import {AuthAction} from "base/user/components";
import {NoContentMessage, Spinner} from "base/shared/components";
import {
    FileUploadSection,
    FolderBreadcrumb,
    FolderChangeViewButtonGroup,
    FolderList,
    FolderTable,
} from "base/file/components";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import Tooltip from "@mui/material/Tooltip";

const ListFolder = ({
    folderPath,
    basePath,
    selectedElement = null,
    onSelectElement = null,
    disabled = false,
}) => {
    const {_} = useLingui();
    const [folderElement, setFolderElement] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const downloadDocument = useDownloadDocument();
    const {handleErrors, clearErrors} = useErrors();
    const location = useLocation();
    const {ROLES} = useAuth();
    const {view} = useFolderView();

    useEffect(() => {
        setIsLoading(true);
        DocumentService.get(folderPath)
            .then(element => {
                clearErrors();
                setFolderElement(element);
            })
            .catch(error => {
                handleErrors(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [folderPath, location.state?.lastRefreshDate]);

    const reloadFolder = file => {
        DocumentService.get(folderPath)
            .then(folder => {
                setFolderElement(folder);
            })
            .catch(error => {
                handleErrors(error);
            });
    };

    const downloadFolder = () => {
        downloadDocument(folderElement.name + ".zip", folderPath, "application/zip");
    };

    const getViewComponent = () => {
        if (!folderElement?.children?.length) {
            return (
                <NoContentMessage
                    text={_(msg`This folder is empty.`)}
                    style={{py: 3}}
                />
            );
        } else
            return view === "list" ? (
                <FolderList
                    folderElements={folderElement?.children}
                    selectedElement={selectedElement}
                    onSelectElement={onSelectElement}
                    basePath={basePath}
                />
            ) : (
                <FolderTable
                    basePath={basePath}
                    folderElements={folderElement?.children}
                    selectedElement={selectedElement}
                    onSelectElement={onSelectElement}
                />
            );
    };

    return (
        <Stack justifyContent="flex-start" alignItems="center" spacing={2}>
            <Stack direction="row" width="100%" justifyContent="space-between">
                <FolderBreadcrumb path={folderPath} basePath={basePath} />
                <FolderChangeViewButtonGroup />
            </Stack>
            {isLoading ? <Spinner /> : getViewComponent()}
            {folderElement?.children?.length > 0 && (
                <Stack direction="row" justifyContent="flex-end" width="100%">
                    <Tooltip title={<Trans>Download files</Trans>}>
                        <IconButton aria-label="download-zip" onClick={downloadFolder}>
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            )}
            {!disabled ? (
                <AuthAction roles={[]}>
                    <Stack width="100%" mt={4}>
                        <FileUploadSection
                            path={folderPath}
                            onFinishUpload={reloadFolder}
                        />
                    </Stack>
                </AuthAction>
            ) : null}
        </Stack>
    );
};

export default ListFolder;
