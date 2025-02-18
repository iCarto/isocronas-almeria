import {cloneElement, useState} from "react";
import {Trans} from "@lingui/macro";

import {
    EntityListSearchForm,
    EntityChangeView,
    EntityCounter,
} from "base/entity/components/presentational";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";

import FilterListIcon from "@mui/icons-material/FilterList";

const EntityListPageHeader = ({
    basePath,
    label,
    views,
    search: componentSearch = null,
    filter: componentFilter = null,
    counter: componentCounter = null,
    create: componentCreate = null,
}) => {
    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

    const toggleFilterAccordion = () => {
        setIsAccordionExpanded(prevState => !prevState);
    };

    return (
        <Grid container spacing={2} columnSpacing={2} justifyContent="space-between">
            <Grid item xs={12} md={7}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    {componentSearch ? (
                        cloneElement(componentSearch, {label})
                    ) : (
                        <EntityListSearchForm label={label} />
                    )}
                    {componentFilter && (
                        <Button
                            onClick={toggleFilterAccordion}
                            startIcon={<FilterListIcon />}
                            sx={{
                                marginBottom: 0.5,
                                textAlign: "left",
                                lineHeight: 1.25,
                                color: "text.secondary",
                                fontSize: "0.75rem",
                            }}
                        >
                            {!isAccordionExpanded ? (
                                <Trans>Show filters</Trans>
                            ) : (
                                <Trans>Hide filters</Trans>
                            )}
                        </Button>
                    )}
                    {componentCounter ? (
                        cloneElement(componentCounter, {label})
                    ) : (
                        <EntityCounter label={label} />
                    )}
                </Stack>
            </Grid>
            <Grid
                item
                container
                xs={12}
                md={5}
                justifyContent="flex-end"
                alignItems="center"
            >
                <Stack direction="row" spacing={1}>
                    {views.length > 1 && <EntityChangeView views={views} />}
                </Stack>
            </Grid>
            {componentFilter && (
                <Grid item xs={12} md={9}>
                    <Collapse
                        in={isAccordionExpanded}
                        timeout="auto"
                        sx={{width: "100%"}}
                    >
                        {cloneElement(componentFilter)}
                    </Collapse>
                </Grid>
            )}
        </Grid>
    );
};
export default EntityListPageHeader;
