import {HashLink} from "react-router-hash-link";
import {HEADER_HEIGHT} from "base/ui/baseApp/config/measurements";
import useTheme from "@mui/material/styles/useTheme";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const TextLink = ({
    text,
    to,
    textStyle = {},
    textVariant = "body1",
    isHashLink = false,
    isExternalLink = false,
}) => {
    const theme = useTheme();
    const textLinkStyle = {
        display: "inline-block",
        color: theme.palette.primary.main,
        textDecoration: "underline",
        textDecorationColor: "rgba(0, 123, 196, 0.4)",
    };

    const textLinkHoverStyle = {
        "&:hover": {
            textDecoration: "underline",
            textDecorationColor: theme.palette.primary.dark,
        },
    };

    /**
     * For hash links, we need to adjust the scroll position to account for our sticky header.
     *
     * @param {Element} element - The target element to scroll to.
     */
    const handleScroll = element => {
        const yCoordinate =
            element.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
        window.scrollTo({top: yCoordinate, behavior: "smooth"});
    };

    return isExternalLink ? (
        <Link href={to} target="_blank" rel="noopener noreferrer" style={textLinkStyle}>
            <Typography
                variant={textVariant}
                sx={{...textLinkHoverStyle, ...textStyle}}
            >
                {text}
            </Typography>
        </Link>
    ) : (
        <Link
            component={HashLink}
            to={to}
            scroll={isHashLink ? handleScroll : null}
            style={{...textLinkStyle}}
        >
            <Typography
                variant={textVariant}
                sx={{...textLinkHoverStyle, ...textStyle}}
            >
                {text}
            </Typography>
        </Link>
    );
};

export default TextLink;
