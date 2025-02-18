import {useEffect, useState} from "react";
import {useController, useFormContext} from "react-hook-form";

import {useRulesEngine} from "base/rules/provider";
import {REQUIRED_FIELD} from "../validation";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import ListSubheader from "@mui/material/ListSubheader";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    autoFocus: false,
};

const FormSelectMultipleChip = ({
    name: propsName,
    label = "",
    options,
    rules = {},
    nestedProp = null,
    onChangeHandler = null,
}) => {
    const {isFieldHidden, isFieldRequired} = useRulesEngine();
    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    const required =
        rules["required"] ||
        (isFieldRequired(propsName) ? REQUIRED_FIELD.required : null);
    const formRules = {
        ...rules,
        required,
    };

    const {control} = useFormContext();
    const {
        field: {onChange, name, value, ref},
    } = useController({
        name: propsName,
        control,
        rules: formRules,
    });

    const [filteredOptions, setFilteredOptions] = useState([]);

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    if (isFieldHidden(propsName)) {
        return null;
    }

    const getLabel = (options, value) => {
        for (const option of options) {
            if (option.value === value) {
                return option.label;
            }
            if (nestedProp && option.children && option.children[nestedProp]?.length) {
                const found = getLabel(option.children[nestedProp], value);
                if (found) return found;
            }
        }
        return null;
    };

    const setNewValues = newValues => {
        onChange(newValues);
        if (onChangeHandler) {
            onChangeHandler(newValues, propsName);
        }
    };

    const handleChange = newValues => {
        setNewValues([...newValues]);
    };

    const handleDelete = deletedValue => {
        setNewValues([...value.filter(singleValue => singleValue != deletedValue)]);
    };

    const handleDeleteAll = () => {
        setNewValues([]);
    };

    const isOptionFiltered = (option, search) => {
        return option.label.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    };

    const filter = (options, search) => {
        const getFilteredOptions = (result, option) => {
            if (isOptionFiltered(option, search)) {
                result.push(option);
                return result;
            }
            if (option.children && Array.isArray(option.children[nestedProp])) {
                const filteredOptions = option.children[nestedProp].reduce(
                    getFilteredOptions,
                    []
                );
                if (filteredOptions.length) {
                    let children = {};
                    children[nestedProp] = filteredOptions;
                    result.push({...option, children});
                }
            }
            return result;
        };
        return options.reduce(getFilteredOptions, []);
    };

    const handleSearchChange = search => {
        console.log({search});
        const newFilteredOptions = filter(options, search);
        console.log({newFilteredOptions});
        setFilteredOptions(newFilteredOptions);
    };

    return (
        <FormControl fullWidth sx={{mt: 1}}>
            <InputLabel id={`${name}-label`} shrink>
                {inputLabel}
            </InputLabel>
            <Select
                labelId={`${name}-select-label`}
                id={`${name}-select`}
                multiple
                inputRef={ref}
                value={value || []}
                onChange={event => {
                    handleChange(event.target.value);
                }}
                input={
                    <OutlinedInput
                        id={`${name}-input`}
                        label={label}
                        notched
                        endAdornment={
                            value?.length > 0 && (
                                <InputAdornment position="end" sx={{mr: 3}}>
                                    <IconButton
                                        aria-label="clear filter"
                                        edge="end"
                                        onClick={handleDeleteAll}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    />
                }
                renderValue={selectedValues => (
                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                        {selectedValues.map(value => (
                            <Chip
                                color="secondary"
                                key={value}
                                label={getLabel(options, value)}
                                variant="outlined"
                                onDelete={() => handleDelete(value)}
                                onMouseDown={event => {
                                    event.stopPropagation();
                                }}
                            />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                <ListSubheader>
                    <OutlinedInput
                        type="text"
                        onChange={ev => {
                            ev.preventDefault();
                            handleSearchChange(ev.target.value);
                        }}
                        onKeyDown={ev => {
                            if (ev.key === "Enter") {
                                ev.preventDefault();
                            }
                            ev.stopPropagation();
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        autoFocus
                        fullWidth
                        inputProps={{style: {padding: 8}}}
                    />
                </ListSubheader>
                {filteredOptions?.map((option, index) => {
                    return nestedProp ? (
                        [
                            <ListSubheader key={index}>{option.label}</ListSubheader>,
                            ...option.children[nestedProp].map(nestedOption => (
                                <MenuItem
                                    key={nestedOption.value}
                                    value={nestedOption.value}
                                >
                                    {nestedOption.label}
                                </MenuItem>
                            )),
                        ]
                    ) : (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default FormSelectMultipleChip;
