import {useErrors} from "../provider";
import styled from "@mui/material/styles/styled";
import Alert from "@mui/material/Alert";

const AlertStyled = styled(Alert)(({theme}) => ({
    marginBottom: theme.spacing(1),
    whiteSpace: "pre-line",
}));

const ErrorAlertList = ({errors, ...props}) => {
    const {clearErrors} = useErrors();

    const handleClose = () => {
        clearErrors();
    };

    return (
        <AlertStyled
            severity="error"
            sx={{width: "100%"}}
            onClose={handleClose}
            {...props}
        >
            {errors.map((item, index) => (
                <div key={index}>{item.message}</div>
            ))}
        </AlertStyled>
    );
};

export default ErrorAlertList;
