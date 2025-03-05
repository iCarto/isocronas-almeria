import createTheme from "@mui/material/styles/createTheme";

import green from "@mui/material/colors/green";
import blueGrey from "@mui/material/colors/blueGrey";

import {localeDependenciesMap} from "base/i18n/config/localeDependenciesMap";
import {defaultLocale} from "base/i18n/config/i18nConfig";
import {HEADER_HEIGHT} from "base/ui/baseApp/config/measurements";

/*
Notes on colors:
1. Only the "main" variant is needed for the palette. "Dark" and "light" variants will default from createTheme if not provided.
2. Specific colors can be imported from MUI palettes (https://mui.com/material-ui/customization/color/) with their full range of hues and shades.
3. Colors are defined in a global variable (CUSTOM_COLORS) for use in non-React components (e.g., hooks).
*/

export const CUSTOM_FONT_FAMILY = "Roboto";

export const CUSTOM_COLORS = {
    primary: {
        main: "#3a6b5a",
        light: "#6b9e8f",
        lighter: "#b8d6d1",
        dark: "#2c4e42",
        contrastText: "#fff",
        hover: "#9db9b3",
    },
    secondary: {
        main: "#7e6a4b",
        light: "#bfa78b",
        lighter: "#e6d9c7",
        dark: "#4f3d2f",
    },
    success: green,
    error: {
        main: "#d32f2f",
        dark: "#a92323",
    },
    pageBackground: {primary: "#e4e9e2", secondary: "#f1f4f0"},
    text: {
        primary: "#1f3931",
    },
    grey: blueGrey,
    white: "#fff",
};

const customHeadingsStyle = {fontFamily: CUSTOM_FONT_FAMILY, fontWeight: "bold"};

export const getTheme = (locale = defaultLocale) => {
    const muiLocale = localeDependenciesMap[locale]?.muiLocale;

    const customTheme = createTheme({
        palette: {
            primary: {
                main: CUSTOM_COLORS.primary.main,
                lighter: CUSTOM_COLORS.primary.lighter,
            },
            secondary: {
                dark: CUSTOM_COLORS.secondary.dark,
                main: CUSTOM_COLORS.secondary.main,
                light: CUSTOM_COLORS.secondary.light,
                lighter: CUSTOM_COLORS.secondary.lighter,
            },
            success: {
                main: CUSTOM_COLORS.success[600],
                light: CUSTOM_COLORS.success[200],
                lighter: CUSTOM_COLORS.success[100],
                dark: CUSTOM_COLORS.success[800],
            },
            error: {
                main: CUSTOM_COLORS.error.main,
                dark: CUSTOM_COLORS.error.dark,
            },
            pageBackground: {
                primary: CUSTOM_COLORS.pageBackground.primary,
                secondary: CUSTOM_COLORS.pageBackground.secondary,
            },
            white: CUSTOM_COLORS.white,
            text: {
                primary: CUSTOM_COLORS.text.primary,
            },
            menu: {
                primary: {
                    header: {
                        background: CUSTOM_COLORS.primary.lighter,
                        text: CUSTOM_COLORS.secondary.dark,
                    },
                    options: {
                        background: CUSTOM_COLORS.secondary.dark,
                        text: CUSTOM_COLORS.primary.light,
                    },
                },
                secondary: {
                    header: {
                        background: CUSTOM_COLORS.primary.lighter,
                        text: CUSTOM_COLORS.secondary.dark,
                    },
                    options: {
                        background: CUSTOM_COLORS.white,
                        text: CUSTOM_COLORS.grey[600],
                    },
                    background: "white",
                },
            },
        },

        typography: {
            fontSize: 14,
        },

        mixins: {
            toolbar: {
                minHeight: `${HEADER_HEIGHT}px`,
            },
        },

        components: {
            MuiTypography: {
                styleOverrides: {
                    h1: customHeadingsStyle,
                    h2: customHeadingsStyle,
                    h3: customHeadingsStyle,
                    h4: customHeadingsStyle,
                    h5: customHeadingsStyle,
                    h6: {...customHeadingsStyle, color: CUSTOM_COLORS.secondary.dark},
                },
            },

            MuiButton: {
                styleOverrides: {
                    root: {
                        fontSize: 14,
                    },
                },
            },

            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        "&.Mui-selected": {
                            // <-- mixing the two classes
                            backgroundColor: CUSTOM_COLORS.secondary.light,
                        },
                    },
                },
            },

            MuiTableRow: {
                styleOverrides: {
                    root: {
                        "&:last-child td, &:last-child th": {
                            borderBottom: 0,
                        },
                    },
                },
            },

            MuiTableCell: {
                styleOverrides: {
                    head: {
                        lineHeight: "1rem",
                    },
                },
            },

            MuiTableSortLabel: {
                styleOverrides: {
                    root: {
                        lineHeight: "1rem",
                    },
                },
            },

            MuiInputBase: {
                styleOverrides: {
                    root: {
                        backgroundColor: CUSTOM_COLORS.white,
                    },
                    input: {
                        fontSize: "14px",
                        height: "unset",
                        "&::placeholder": {
                            opacity: 0.15,
                            fontStyle: "italic",
                        },
                    },
                },
            },

            MuiOutlinedInput: {
                styleOverrides: {
                    input: {
                        padding: "12px 0 12px 14px",
                        backgroundColor: CUSTOM_COLORS.white,
                    },
                },
            },

            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        opacity: 0.8,
                        top: "-6%",
                    },
                },
            },

            MuiAutocomplete: {
                styleOverrides: {
                    inputRoot: {
                        paddingTop: "7px",
                        paddingBottom: "6px",
                    },
                },
            },
        },
        // Language for UI localization
        muiLocale,
    });

    return customTheme;
};

// If no custom theme is provided, an empty object returns MUI's default theme.
export const theme = getTheme() || {};
