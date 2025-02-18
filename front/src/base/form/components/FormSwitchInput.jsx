import {FormSwitch} from ".";
import Box from "@mui/material/Box";

const FormSwitchInput = ({name, label, onChangeHandler = null}) => {
    return (
        <Box
            sx={{
                mt: "4px",
                py: "4px",
                px: "12px",
                border: 1,
                borderRadius: 1,
                borderColor: "grey.400",
            }}
        >
            <FormSwitch name={name} label={label} onChangeHandler={onChangeHandler} />
        </Box>
    );
};

export default FormSwitchInput;
