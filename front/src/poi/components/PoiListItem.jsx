import {cloneElement, createElement} from "react";
import styled from "@mui/material/styles/styled";

import {FieldUtil} from "base/ui/section/utilities";
import {usePoiListItemFields} from "poi/shared/map";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Collapse from "@mui/material/Collapse";

import CircleIcon from "@mui/icons-material/Circle";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {usePoiCategoryUtil} from "poi/utils";

const AccordionSummary = styled(props => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: "0.9rem"}} />}
        {...props}
    />
))(() => ({
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
        transition: "transform 0.3s ease",
    },
    "& .MuiAccordionSummary-content": {
        margin: 0,
    },
}));

const PoiListItem = ({feature, isExpanded, onExpand}) => {
    const {fields} = usePoiListItemFields();
    const properties = feature.properties;

    const handleClick = (event, isExpanded) => {
        onExpand(event, isExpanded);
    };

    const {getStyleForCategory} = usePoiCategoryUtil();

    const categoryStyle = getStyleForCategory(feature.properties.category);
    const categoryIcon = categoryStyle.icon;
    const categoryColor = categoryStyle.color;

    return (
        <Accordion
            expanded={isExpanded}
            onChange={handleClick}
            disableGutters
            slots={{transition: Collapse}}
            slotProps={{transition: {timeout: 400}}}
        >
            <AccordionSummary
                sx={{
                    margin: 0,
                    p: 0,
                    pr: 1,
                }}
            >
                <ListItem disablePadding className="LayerMenuListItem">
                    <ListItemButton sx={{pl: 2}}>
                        <ListItemIcon sx={{p: 0, minWidth: 32}}>
                            {createElement(categoryIcon, {
                                fontSize: "small",
                                sx: {color: categoryColor},
                            })}
                        </ListItemIcon>
                        <ListItemText
                            primary={properties.name}
                            secondary={`${properties.category} - ${properties.municipality}`}
                        />
                    </ListItemButton>
                </ListItem>
            </AccordionSummary>
            {isExpanded && (
                <AccordionDetails
                    sx={{
                        backgroundColor: "rgba(230, 217, 199, 0.8)",
                    }}
                >
                    {fields
                        .map(field => ({
                            ...field,
                            value: field.formatFunction
                                ? field.formatFunction(properties)
                                : FieldUtil.getValue(properties[field.property]),
                        }))
                        .filter(field => field.value)
                        .map((field, index) => {
                            return (
                                <Stack
                                    key={index}
                                    direction="row"
                                    spacing={2}
                                    color="grey.800"
                                    my={1}
                                >
                                    <Tooltip title={field.label}>
                                        {field.icon
                                            ? cloneElement(field.icon, {
                                                  fontSize: "small",
                                                  style: {marginRight: 12},
                                              })
                                            : null}
                                    </Tooltip>
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{
                                            marginTop: 1,
                                            marginLeft: 0,
                                            overflowWrap: "anywhere",
                                        }}
                                    >
                                        {field.formatFunction
                                            ? field.formatFunction(properties)
                                            : FieldUtil.getValue(
                                                  properties[field.property]
                                              )}
                                    </Typography>
                                </Stack>
                            );
                        })}
                </AccordionDetails>
            )}
        </Accordion>
    );
};

export default PoiListItem;
