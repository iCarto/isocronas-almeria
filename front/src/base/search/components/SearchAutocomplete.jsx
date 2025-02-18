import {useState} from "react";
import {useController, useFormContext} from "react-hook-form";
import {msg, Trans} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";

const WAIT_INTERVAL = 500;
let timerID;

const SearchAutocomplete = ({
    name: propsName,
    label,
    optionLabel,
    optionLabelSecondary = "",
    optionComponent,
    optionIdAttribute = "id",
    getFilterOption = null,
    search,
    onChangeHandler = null,
    defaultValue = null,
    rules = {},
}) => {
    // If "loading" and "data" are managed in different state
    // properties, component will re-render on every change.
    // https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    // https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#render-batching-and-timing
    // This problem is mitigated by batching the state solutions
    // planned for version 18
    // https://github.com/reactwg/react-18/discussions/21
    const [state, setState] = useState({
        loading: false,
        data: [],
    });

    const {_} = useLingui();
    const {control} = useFormContext();
    const inputLabel = rules && rules["required"] ? `${label} *` : label;

    const {
        field: {onChange, value, ref},
        fieldState: {error},
    } = useController({
        name: propsName,
        control,
        rules,
    });

    const handleSelectOption = (event, value) => {
        onChange(value);
        if (onChangeHandler) onChangeHandler(value);
    };

    const searchData = async value => {
        setState(prevState => {
            return {
                ...prevState,
                loading: true,
            };
        });
        const fetchedData = await search(value);
        setState({
            loading: false,
            data: fetchedData,
        });
    };

    const handleSearchChange = async value => {
        clearTimeout(timerID);

        timerID = setTimeout(() => {
            searchData(value);
        }, WAIT_INTERVAL);
    };

    const getOptionLabel = data => {
        if (!data) return "";
        if (data[optionLabelSecondary])
            return `${data[optionLabel]} - ${data[optionLabelSecondary]}`;
        else return data[optionLabel];
    };

    return (
        <Autocomplete
            id="check-autocomplete"
            value={value}
            options={state.data}
            noOptionsText={<Trans>No options available</Trans>}
            defaultValue={defaultValue}
            onChange={handleSelectOption}
            getOptionLabel={data => getOptionLabel(data)}
            filterOptions={createFilterOptions({
                stringify: option =>
                    getFilterOption ? getFilterOption(option) : option[optionLabel],
            })}
            isOptionEqualToValue={(option, value) =>
                value &&
                value !== "" &&
                option[optionIdAttribute] === value[optionIdAttribute]
            }
            renderOption={(props, option, {selected}) => {
                return (
                    <Box component="li" {...props} key={option.id}>
                        {optionComponent(option)}
                    </Box>
                );
            }}
            forcePopupIcon={false}
            loading={state.loading}
            renderInput={params => (
                <TextField
                    margin={"dense"}
                    error={Boolean(error)}
                    inputRef={ref}
                    label={inputLabel}
                    {...params}
                    helperText={error?.message}
                    onChange={ev => {
                        // dont fire API if the user delete or not entered anything
                        if (!ev.target.value || ev.target.value.length <= 2)
                            setState({
                                loading: false,
                                data: [],
                            });
                        else handleSearchChange(ev.target.value);
                    }}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <>
                                {state.loading ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    placeholder={_(msg`Type to search`)}
                    variant="outlined"
                />
            )}
        />
    );
};

export default SearchAutocomplete;
