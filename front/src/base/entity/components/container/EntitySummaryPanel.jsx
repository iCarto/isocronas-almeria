import {cloneElement} from "react";
import {Trans} from "@lingui/macro";

import {useBasePath, useNavigateWithReload} from "base/navigation/hooks";
import {useEntityPanelContext} from "base/entity/provider";
import {SidebarPanelLayout} from "base/ui/sidebar";
import {ImagePreview} from "base/image/components";
import {FeaturedDocumentDownload} from "base/file/components";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import LaunchIcon from "@mui/icons-material/Launch";
import Stack from "@mui/material/Stack";

const DetailButton = ({handleDetail, element}) => (
    <Grid container justifyContent="center" sx={{mt: 2}}>
        <Button
            variant="contained"
            sx={{ml: 3}}
            onClick={() => handleDetail(element)}
            startIcon={<LaunchIcon />}
        >
            <Trans>View detail</Trans>
        </Button>
    </Grid>
);

const EntitySummaryPanel = ({
    title,
    detail = null,
    detailOptions: {show: showDetail = true, onClick: onClickDetail = null} = {},
    documentOptions: {showFeaturedImage = true, showFeaturedDocument = true} = {},
    children = null,
}) => {
    const navigate = useNavigateWithReload();
    const {basePath} = useBasePath("info/:id");

    const {element, loading} = useEntityPanelContext();

    const handleClose = () => {
        navigate(basePath);
    };

    const handleDetail = element => {
        onClickDetail ? onClickDetail(element) : navigate(`${basePath}/${element.id}`);
    };

    return (
        <SidebarPanelLayout sidebarTitle={title} closeSidebarClick={handleClose}>
            <Stack sx={{width: "100%"}}>
                {loading ? (
                    <Grid item container justifyContent="center" my={6}>
                        <CircularProgress size={40} />
                    </Grid>
                ) : (
                    element && (
                        <>
                            {showFeaturedImage && element.featured_image && (
                                <Box sx={{mb: 3}}>
                                    <ImagePreview
                                        path={element.featured_image}
                                        alt={element.name}
                                    />
                                </Box>
                            )}
                            {children ? cloneElement(children, {element}) : null}
                            {showFeaturedDocument && element.featured_document && (
                                <Grid container justifyContent="center" sx={{mt: 2}}>
                                    <FeaturedDocumentDownload
                                        featuredDocument={element.featured_document}
                                    />
                                </Grid>
                            )}
                            {detail
                                ? cloneElement(detail, {handleDetail, element})
                                : showDetail && (
                                      <DetailButton
                                          handleDetail={handleDetail}
                                          element={element}
                                      />
                                  )}
                        </>
                    )
                )}
            </Stack>
        </SidebarPanelLayout>
    );
};

export default EntitySummaryPanel;
