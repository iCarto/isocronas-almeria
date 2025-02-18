import {cloneElement} from "react";
import {FieldUtil} from "base/ui/section/utilities";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";

const EntityCard = ({
    element,
    heading = null,
    fields = [],
    selected = false,
    onClick = null,
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(element.id);
        }
    };

    const getFieldNote = (field, entity) => {
        return field.note ? field.note(entity) : null;
    };

    return (
        <Card
            id={`card-${element.id}`}
            onClick={handleClick}
            sx={{
                cursor: onClick ? "pointer" : "inherit",
                border: selected ? "3px solid lightgrey" : "inherit",
            }}
            elevation={5}
        >
            <CardContent>
                {heading || (
                    <Typography variant="h5" gutterBottom color="primary">
                        {element["name"] || element["code"]}
                    </Typography>
                )}
                <Typography variant="body2">{element["comments"]}</Typography>
            </CardContent>
            <CardContent sx={{bgcolor: "grey.100"}}>
                <Stack spacing={1}>
                    {fields.map((field, index) => {
                        const fieldNote = getFieldNote(field, element);

                        return (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                color="grey.700"
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
                                        ? field.formatFunction(element)
                                        : FieldUtil.getValue(element[field.property])}
                                    {fieldNote ? (
                                        <Tooltip title={fieldNote}>
                                            <Typography component="span"> *</Typography>
                                        </Tooltip>
                                    ) : null}
                                </Typography>
                            </Stack>
                        );
                    })}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default EntityCard;
