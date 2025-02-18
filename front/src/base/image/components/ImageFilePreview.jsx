import Box from "@mui/material/Box";

const ImageFilePreview = ({image, alt = "", width = null, height = null, sx = {}}) => {
    console.log({image});
    const getComponent = () => {
        return width && height ? (
            <Box
                component="div"
                sx={{
                    width,
                    height,
                    backgroundImage: `url(${window.URL.createObjectURL(image)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    ...sx,
                }}
            />
        ) : (
            <Box
                component="img"
                alt={alt}
                src={window.URL.createObjectURL(image)}
                sx={{width: "100%", ...sx}}
            />
        );
    };

    return getComponent();
};

export default ImageFilePreview;
