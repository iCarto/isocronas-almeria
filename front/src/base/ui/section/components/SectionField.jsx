import {useNavigate} from "react-router-dom";
import {t} from "@lingui/macro";

import {TextLink} from "base/navigation/components";
import {
    SectionFieldEditButton,
    SectionFieldHelpText,
    SectionFieldLabel,
    SectionValueBox,
} from ".";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Unit = ({unit}) => {
    return (
        <Typography
            variant="subtitle1"
            component="span"
            sx={{
                lineHeight: {xs: 1.85, sm: 1.65},
                ml: 1,
                overflowWrap: "break-word",
                whiteSpace: "pre-line;",
                fontSize: "0.8em",
                color: "grey",
            }}
        >
            {unit}
        </Typography>
    );
};

const SectionField = ({
    label = null,
    value = null,
    unit = "",
    labelIcon = null,
    containerWidth = "",
    valueCustomStyle = {},
    linkPath = null,
    editButton = false,
    editButtonPath = "",
    helperText = "",
    tooltipText = null,
    hideValueBox = false,
    isHighlighted = false,
    longField = false,
}) => {
    const navigate = useNavigate();

    const getValueWidth = () => {
        let labelWidth;
        let valueWidth;
        if (longField) {
            labelWidth = 2.5;
            valueWidth = 9.5;
        } else
            switch (`${containerWidth}`) {
                case "long":
                    labelWidth = 9;
                    valueWidth = editButton ? 2 : 3;
                    break;
                case "short":
                    labelWidth = editButton ? 5 : 6;
                    valueWidth = 6;
                    break;
                default:
                    labelWidth = 5;
                    valueWidth = editButton ? 6 : 7;
                    break;
            }
        return {labelWidth, valueWidth};
    };

    const {labelWidth, valueWidth} = getValueWidth();

    const valueStyle = {
        mt: {xs: 0, sm: 1.5},
        overflowWrap: "break-word",
        lineHeight: {xs: 1.5, sm: 1.25},
        fontWeight: isHighlighted ? 600 : "regular",
        ...valueCustomStyle,
    };

    const getValueToDisplay = () => {
        if (value === true) return t`Yes`;
        if (value === false) return t`No`;
        else return value;
    };

    const regularField = (
        <>
            <Typography variant="subtitle2" component="span" sx={valueStyle}>
                {getValueToDisplay()}
            </Typography>
            {helperText && <SectionFieldHelpText text={helperText} />}
            {unit && <Unit unit={unit} />}
        </>
    );

    const linkField = (
        <TextLink
            text={getValueToDisplay()}
            to={linkPath}
            textStyle={{fontSize: "14px"}}
        />
    );

    const LabelIcon = labelIcon;
    const isValueValid = value || value === 0 || typeof value === "boolean";
    const typeOfField = linkPath ? linkField : regularField;

    return (
        <Grid container columnSpacing={containerWidth === "long" ? 2 : 1}>
            <Grid
                item
                container
                flexWrap={tooltipText ? "nowrap" : "wrap"}
                xs="auto"
                sm={5}
                lg={labelWidth}
                alignItems={tooltipText ? "center" : "flex-start"}
                alignContent="center"
            >
                {tooltipText && (
                    <Tooltip title={tooltipText} arrow enterDelay={500}>
                        <InfoOutlinedIcon
                            sx={{mr: 1, color: "grey.500", fontSize: "0.9rem"}}
                        />
                    </Tooltip>
                )}
                {labelIcon && (
                    <LabelIcon fontSize="small" sx={{mr: 1, color: "text.secondary"}} />
                )}
                {label && (
                    <SectionFieldLabel label={label} isHighlighted={isHighlighted} />
                )}
            </Grid>
            <Grid
                item
                container
                xs="auto"
                sm={6}
                lg={valueWidth}
                alignItems="flex-end"
                alignContent="center"
            >
                {hideValueBox ? (
                    value
                ) : (
                    <SectionValueBox isHighlighted={isHighlighted}>
                        {isValueValid ? typeOfField : "—"}
                    </SectionValueBox>
                )}
                {editButton ? (
                    <Grid item xs={1}>
                        <SectionFieldEditButton onClick={navigate(editButtonPath)} />
                    </Grid>
                ) : null}
            </Grid>
        </Grid>
    );
};

export default SectionField;
