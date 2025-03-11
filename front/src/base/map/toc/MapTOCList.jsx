import Box from "@mui/material/Box";
import List from "@mui/material/List";
import styled from "@mui/material/styles/styled";

const MapTOCBox = styled(Box)(({theme}) => ({
    width: "100%",
    height: "100%",
    overflowY: "hidden",
    fontSize: "0.9rem",
    "& .MapMenuList": {
        width: "100%",
        paddingTop: "0px",
        paddingBottom: "0px",
        "& .LayerMenuListItem": {
            paddingTop: "0px",
            paddingBottom: "0px",
            "& .LayerMenuCheckbox": {
                padding: "0px",
                transform: "scale(0.7)",
            },
            "& .LayerMenuIcon": {
                width: "12px",
                height: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "5px",
                borderRadius: "3px",
            },
            "& .LayerMenuIconLine": {
                width: "12px",
                height: "2px",
                marginRight: "5px",
            },
            "& .LayerMenuIconImage": {
                width: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "5px",
                "& img": {
                    width: "12px",
                },
            },
            "& .LayerMenuIconPolygon": {
                width: "12px",
                height: "12px",
                borderRadius: "44% 56% 62% 38% / 73% 48% 52% 27% ",
                marginRight: "5px",
            },
            "& .MuiListItemText-root": {
                "& .MuiTypography-root": {
                    fontSize: "0.8rem",
                },
            },
            "& .MuiListItemSecondaryAction-root": {
                "& .MuiSvgIcon-root": {
                    transform: "scale(0.7)",
                },
            },
        },
        "& .LayerMenuDiscriminatorInfo": {
            marginLeft: "35px",
            marginRight: "50px",
            paddingTop: "0px",
            paddingBottom: "5px",
            color: "#555",
            backgroundColor: "white",
            border: `1px solid ${theme.palette.secondary.light}`,
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            "& .LayerMenuDiscriminatorInfoHeader": {
                lineHeight: "20px",
                fontWeight: "normal",
                fontStyle: "italic",
                fontSize: "0.7rem",
                color: "#555",
            },
            "& .LayerMenuLegendItem": {
                height: "20px",
                paddingLeft: "10px",
                fontSize: "0.8rem",
                "& .LayerMenuLegendItemButton": {
                    transform: "scale(0.7)",
                    color: "#aaa",
                    padding: "0px",
                },
                "& .LayerMenuLegendItemText": {
                    marginTop: "0px",
                    marginBottom: "0px",
                    marginLeft: "4px",
                    "& .MuiTypography-root": {
                        fontSize: "0.7rem",
                    },
                },
                "& .LayerMenuIconPoint": {
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                },
                "& .LayerMenuIcon": {
                    width: "12px",
                    height: "12px",
                },
            },
        },
    },
}));

const MapTOCList = ({children}) => {
    return (
        <MapTOCBox>
            <List className="MapMenuList">{children}</List>
        </MapTOCBox>
    );
};

export default MapTOCList;
