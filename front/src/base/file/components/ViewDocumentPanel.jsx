import {useEffect, useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import {useLingui} from "@lingui/react";
import {msg} from "@lingui/macro";
import {Trans} from "@lingui/macro";

import {DocumentService} from "../service";
import {useDownloadDocument} from "../utilities";
import {useCopyToClipboard} from "base/shared/utilities";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useErrors} from "base/error/provider";

import {AuthAction} from "base/user/components";
import {DeleteDocumentDialog, DocumentSection} from ".";
import {SidebarAction, SidebarPanelLayout} from "base/ui/sidebar";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import DownloadIcon from "@mui/icons-material/Download";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

const ViewDocumentPanel = ({
    onSetFeaturedImage = null,
    onSetFeaturedDocument = null,
}) => {
    const {_} = useLingui();

    const navigate = useNavigateWithReload();
    const {handleErrors, clearErrors} = useErrors();

    const params = useParams();
    const {idDocument} = params;

    const location = useLocation();

    const [folderElement, setFolderElement] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        clearErrors();
        if (!idDocument) {
            let path = params["*"];
            if (path) {
                setLoading(true);
                DocumentService.get(path)
                    .then(element => {
                        setFolderElement(element);
                    })
                    .catch(error => {
                        handleErrors(error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        } else {
            setLoading(true);
            DocumentService.getDocument(idDocument)
                .then(element => {
                    setFolderElement(element);
                })
                .catch(error => {
                    handleErrors(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [params]);

    const downloadDocument = useDownloadDocument();
    const copyToClipBoard = useCopyToClipboard();

    const handleDownload = async () => {
        downloadDocument(
            folderElement.name,
            folderElement.path,
            folderElement.content_type
        );
    };

    const handleCopyLink = () => {
        copyToClipBoard(window.location);
    };

    const handleSetFeaturedImage = () => {
        onSetFeaturedImage(folderElement.id).then(response => {
            handleCloseSidebar(true);
        });
    };

    const handleSetFeaturedDocument = () => {
        onSetFeaturedDocument(folderElement.id).then(response => {
            handleCloseSidebar(true);
        });
    };

    const handleDeleteDialog = isOpen => {
        setIsDeleteDialogOpen(isOpen);
    };

    const handleCloseSidebar = (refresh = false) => {
        const previousPath = idDocument
            ? location.pathname
                  .split("/")
                  .slice(0, -1)
                  .join("/")
                  .replace("/document", "")
            : location.pathname
                  .split("/")
                  .slice(0, -1)
                  .join("/")
                  .replace("/detail", "");
        navigate(previousPath, refresh);
    };

    const sidebarActions = [
        <SidebarAction
            key="copy-link-to-file"
            name="copy link to file"
            text={<Trans>Copy link</Trans>}
            icon={<LinkIcon />}
            onClick={handleCopyLink}
        />,
        onSetFeaturedImage &&
        folderElement &&
        folderElement.content_type.startsWith("image") ? (
            <SidebarAction
                key="set-featured-image"
                name="set featured image"
                text={<Trans>Set as featured image</Trans>}
                icon={<ImageOutlinedIcon />}
                onClick={handleSetFeaturedImage}
            />
        ) : null,
        onSetFeaturedDocument && folderElement ? (
            <SidebarAction
                key="set-featured-file"
                name="set featured file"
                text={<Trans>Set as featured file</Trans>}
                icon={<InsertDriveFileOutlinedIcon />}
                onClick={handleSetFeaturedDocument}
            />
        ) : null,
        <AuthAction
            key="remove-file"
            roles={[]} // TODO: Bootstraped permissions
        >
            <SidebarAction
                name="remove-file"
                text={<Trans>Remove</Trans>}
                icon={<DeleteIcon color="error" />}
                onClick={handleDeleteDialog}
            />
        </AuthAction>,
    ];

    return (
        <SidebarPanelLayout
            sidebarTitle={<Trans>File details</Trans>}
            closeSidebarClick={handleCloseSidebar}
            mainActionText={_(msg`Download`)}
            mainActionClick={handleDownload}
            mainActionIcon={<DownloadIcon />}
            sidebarActions={sidebarActions}
        >
            {loading ? (
                <Grid item container justifyContent="center" xs={12}>
                    <CircularProgress color="inherit" size={20} />
                </Grid>
            ) : (
                <DocumentSection folderElement={folderElement} />
            )}

            <DeleteDocumentDialog
                folderElement={folderElement}
                onDeletedFolderElement={() => handleCloseSidebar(true)}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
            />
        </SidebarPanelLayout>
    );
};

export default ViewDocumentPanel;
