import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {useErrors} from "base/error/provider";
import {APP_NAME, APP_NAME_LONG, APP_LOGO_LOGIN_PATH} from "base/i18n/config/appConfig";
import {LoginForm} from ".";
import {ErrorAlerts} from "base/error/components";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const LoginPage = ({
    appName: customAppName = null,
    appNameLong: customAppNameLong = null,
    loginLogo: customLoginLogo = null,
    customHomePath = "/",
}) => {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    const {handleErrors, clearErrors} = useErrors();

    const appName = customAppName || APP_NAME;
    const appNameLong = customAppNameLong || APP_NAME_LONG;
    const loginLogo = customLoginLogo || APP_LOGO_LOGIN_PATH;

    let from = location.state?.from?.pathname || customHomePath;

    useEffect(() => {
        clearErrors();
    }, []);

    const validateLogin = (username, password) => {
        clearErrors();
        auth.login(username, password, () => {})
            .then(() => {
                // Send them back to the page they tried to visit when they were
                // redirected to the login page. Use { replace: true } so we don't create
                // another entry in the history stack for the login page.  This means that
                // when they get to the protected page and click the back button, they
                // won't end up back on the login page, which is also really nice for the
                // user experience.
                navigate(from, {replace: true});
            })
            .catch(error => {
                console.log({error});
                handleErrors(error);
            });
    };

    return (
        <Container
            component="main"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Grid container component={Paper} elevation={6}>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(/images/login/login_image.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: t =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "3px 0px 0 3px",
                    }}
                />
                <Grid item xs={12} sm={8} md={5}>
                    <Box
                        component="header"
                        sx={{
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={loginLogo}
                            alt={`${appName} logo`}
                            style={{padding: "24px", maxHeight: "240px"}}
                        />
                        <Typography component="h1" variant="h5" align="center">
                            {appNameLong}
                        </Typography>
                    </Box>
                    <ErrorAlerts onlyFieldless />
                    <LoginForm handleValidation={validateLogin} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;
