import {useState} from "react";
import {useForm} from "react-hook-form";
import {useLingui} from "@lingui/react";
import {msg} from "@lingui/macro";
import {Trans} from "@lingui/macro";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginForm = ({handleValidation}) => {
    const {_} = useLingui();

    const [displayPassword, setDisplayPassword] = useState(false);

    const togglePassword = () => {
        setDisplayPassword(!displayPassword);
    };

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm();

    const handleFormData = data => {
        handleValidation(data.userName, data.password);
    };

    return (
        <Box
            component="form"
            method="POST"
            onSubmit={handleSubmit(handleFormData)}
            sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <TextField
                id="userName"
                {...register("userName", {
                    required: _(msg`Enter your user name`),
                    maxLength: 20,
                })}
                label={<Trans>User name</Trans>}
                name="userName"
                autoComplete="user name"
                autoFocus
                fullWidth
                margin="normal"
                error={Boolean(errors.userName)}
                helperText={errors.userName?.message}
            />
            <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={Boolean(errors.password)}
            >
                <InputLabel htmlFor="passwordInput">
                    <Trans>Password</Trans>
                </InputLabel>
                <OutlinedInput
                    id="passwordInput"
                    type={displayPassword ? "text" : "password"}
                    {...register("password", {
                        required: _(msg`Enter your password`),
                        maxLength: 50,
                    })}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="show-hide-password"
                                onClick={togglePassword}
                                edge="end"
                                title={_(msg`Show/hide password`)}
                            >
                                {displayPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    autoComplete="password"
                    label={<Trans>Password</Trans>}
                />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3}}>
                <Trans>Access</Trans>
            </Button>
        </Box>
    );
};

export default LoginForm;
