import {cloneElement, useState} from "react";
import {t} from "@lingui/macro";
import {theme} from "Theme";
import {FieldUtil} from "base/ui/section/utilities";
import {useMapGeojsonLayerDataContext} from "base/map/layer/geojson";

import {Spinner} from "base/shared/components";
import {ErrorAlertList} from "base/error/components";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import styled from "@mui/material/styles/styled";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import PublicIcon from "@mui/icons-material/Public";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const AccordionSummary = styled(props => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: "0.9rem"}} />}
        {...props}
    />
))(() => ({
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        margin: 0,
    },
}));

const fields = [
    {
        label: t`Targetted to`,
        property: "people_targetr",
        icon: <AccountBoxOutlinedIcon />,
    },
    {
        label: t`Address`,
        property: "address",
        icon: <FmdGoodOutlinedIcon />,
    },
    {
        label: t`Phone`,
        property: "phone",
        icon: <LocalPhoneOutlinedIcon />,
    },
    {
        label: t`Web`,
        property: "web",
        icon: <PublicIcon />,
    },
];

const PoiListItem = ({feature}) => {
    const properties = feature.properties;
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (event, isExpanded) => {
        console.log(event.target, isExpanded);
        setIsExpanded(isExpanded);
    };

    return (
        <Accordion expanded={isExpanded} disableGutters onChange={handleClick}>
            <AccordionSummary
                sx={{
                    margin: 0,
                    p: 0,
                    pr: 1,
                    backgroundColor: isExpanded
                        ? theme.palette.secondary.light
                        : theme.palette.secondary.lighter,
                }}
            >
                <ListItem disablePadding className="LayerMenuListItem">
                    <ListItemButton sx={{pl: 2}}>
                        <ListItemIcon sx={{p: 0, minWidth: 32}}>
                            <CircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={properties.name}
                            secondary={`${properties.category} - ${properties.municipality}`}
                        />
                    </ListItemButton>
                </ListItem>
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: "rgba(230, 217, 199, 0.8)"}}>
                {fields.map((field, index) => {
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
                                style={{marginTop: 1, marginLeft: 0}}
                            >
                                {field.formatFunction
                                    ? field.formatFunction(properties)
                                    : FieldUtil.getValue(properties[field.property])}
                            </Typography>
                        </Stack>
                    );
                })}
            </AccordionDetails>
        </Accordion>
    );
};

const PoiMapGeojsonLayerFeatureList = () => {
    const {
        loading,
        error,
        elements: featureCollection,
    } = useMapGeojsonLayerDataContext();

    return loading ? (
        <Spinner />
    ) : error ? (
        <ErrorAlertList errors={[error]} />
    ) : (
        featureCollection?.features?.map(feature => (
            <PoiListItem key={feature.id} feature={feature} />
        ))
    );
};

export default PoiMapGeojsonLayerFeatureList;
