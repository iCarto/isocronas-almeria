import Box from "@mui/material/Box";
import {SVGUtil} from "../svg";

const MapTOCListItemIcon = ({icon, defaultStyle = null}) => {
    if (icon) {
        if (icon.type === "image") {
            return (
                <Box className="LayerMenuIconImage">
                    <img src={icon.src} style={icon.style} />
                </Box>
            );
        }
        if (icon.type === "polygon") {
            return (
                <Box
                    className="LayerMenuIconPolygon"
                    sx={{
                        border: `1px solid gray`,
                        ...defaultStyle,
                        ...icon.style,
                    }}
                ></Box>
            );
        }
        return (
            <Box
                className="LayerMenuIcon"
                dangerouslySetInnerHTML={{
                    __html:
                        icon.type === "line"
                            ? SVGUtil.getLine(12, {
                                  ...defaultStyle,
                                  ...icon.style,
                              })
                            : icon.type === "polygon"
                            ? SVGUtil.getPolygon({
                                  ...defaultStyle,
                                  ...icon.style,
                              })
                            : icon.type === "point"
                            ? SVGUtil.getCircle(12, {
                                  ...defaultStyle,
                                  ...icon.style,
                              })
                            : SVGUtil.getSquare(12, {
                                  ...defaultStyle,
                                  ...icon.style,
                              }),
                }}
            ></Box>
        );
    }
    return null;
};

export default MapTOCListItemIcon;
