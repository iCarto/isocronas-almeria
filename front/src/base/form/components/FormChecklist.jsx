import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {useRulesEngine} from "base/rules/provider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import {REQUIRED_FIELD} from "../validation";

const FormChecklist = ({
    name: propsName,
    rules = {},
    onChangeHandler = null,
    disabled = false,
    checklistItems = [],
}) => {
    const {isFieldHidden, isFieldRequired} = useRulesEngine();

    const required =
        rules["required"] ||
        (isFieldRequired(propsName) ? REQUIRED_FIELD.required : null);
    const formRules = {
        ...rules,
        required,
    };

    const {control} = useFormContext();
    const {
        field: {ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules: formRules,
    });

    if (isFieldHidden(propsName)) {
        return null;
    }

    const [checked, setChecked] = useState([-1]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

        const areAllItemsChecked = newChecked.length === checklistItems.length + 1;

        onChangeHandler(areAllItemsChecked, propsName);
    };

    const listItems = checklistItems.map((value, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
            <ListItem key={index} disablePadding>
                <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                    <ListItemIcon>
                        <FormControl error={Boolean(error)}>
                            <Checkbox
                                inputRef={ref}
                                disableRipple
                                edge="start"
                                checked={checked.indexOf(index) !== -1}
                                disabled={disabled}
                                inputProps={{"aria-labelledby": labelId}}
                            />
                        </FormControl>
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value} />
                </ListItemButton>
            </ListItem>
        );
    });

    return <List sx={{width: "100%", bgcolor: "background.paper"}}>{listItems}</List>;
};

export default FormChecklist;
