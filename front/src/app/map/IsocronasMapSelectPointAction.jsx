import {useMapContext} from "base/map";

import {theme} from "Theme";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PlaceIcon from "@mui/icons-material/Place";
import NotListedLocationOutlinedIcon from "@mui/icons-material/NotListedLocationOutlined";
import Box from "@mui/material/Box";

const IconBox = ({children}) => {
    return (
        <Box
            sx={{
                border: 1,
                borderStyle: "solid",
                borderColor: "#0000001f",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 0.4,
            }}
        >
            {children}
        </Box>
    );
};

const IsocronasMapSelectPointAction = () => {
    const {selectedPoint} = useMapContext();

    return (
        <Stack height="100%" alignItems="center">
            <Typography variant="caption">Origen</Typography>
            {selectedPoint ? (
                <IconBox>
                    <PlaceIcon
                        sx={{
                            color: "#2e85cb",
                        }}
                    />
                </IconBox>
            ) : (
                <IconBox>
                    <NotListedLocationOutlinedIcon
                        sx={{
                            color: theme.palette.warning.light,
                        }}
                    />
                </IconBox>
            )}
        </Stack>
    );
};

export default IsocronasMapSelectPointAction;
