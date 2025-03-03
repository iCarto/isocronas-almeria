import {useState, useEffect} from "react";
import {theme} from "Theme";

import {useDomainContext} from "base/domain/provider";
import {useMapContext} from "base/map";
import styled from "@mui/material/styles/styled";

import {CATEGORY_ICONS} from "poi/utils";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";

const CategoryButton = styled(IconButton)(({theme, selected}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    height: "100%",
    color: selected ? theme.palette.primary.main : theme.palette.action.disabled,
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    transition: "all 0.3s ease",
}));

const IsocronasMapCategoriesSelector = ({}) => {
    const [selectedCategories, setSelectedCategories] = useState({});
    const {mapFilter, updateMapFilter} = useMapContext();

    const {domains} = useDomainContext();

    useEffect(() => {
        const initialSelection = {};

        Object.values(mapFilter).forEach(filter => {
            initialSelection[filter] = true;
        });

        setSelectedCategories(initialSelection);
    }, [domains]);

    const handleToggleCategory = category => {
        setSelectedCategories(prev => {
            const newState = {
                [category.value]: !prev[category.value],
            };
            // TO-DO: Implementar categorías múltiples en el filtrado
            handleFilterChange(category.value);
            return newState;
        });

        // setSelectedCategories(prev => {
        //     const newState = {
        //         ...prev,
        //         [category.value]: !prev[category.value],
        //     };

        //     // Notificar al componente padre sobre el cambio
        //     const activeCategories = domains?.poi_category_group
        //         .filter(group => newState[group.value])
        //         .map(group => ({value: group.value, label: group.label}));

        //     handleFilterChange(activeCategories);

        //     return newState;
        // });
    };

    const handleFilterChange = activeCategories => {
        console.log("Categorías activas:", activeCategories);
        // Implementar aquí el filtrado, ahora activeCategories no es un array sino un string
        updateMapFilter({category: activeCategories});
    };

    return (
        <Grid
            container
            alignItems="flex-start"
            columnSpacing={1}
            px={2}
            py={0.5}
            sx={{
                maxHeight: "35%",
                overflowY: "auto",
                borderBottom: `1px solid ${theme.palette.secondary.light}`,
            }}
        >
            {domains?.poi_category_group.map(category => {
                const isSelected = selectedCategories[category.value] || false;
                const IconComponent = CATEGORY_ICONS[category.value] || FilterListIcon;

                return (
                    <Grid item xs={4} xl={3} key={category.value}>
                        <CategoryButton
                            selected={isSelected}
                            onClick={() => handleToggleCategory(category)}
                            key={category.value}
                        >
                            <Box
                                sx={{
                                    mb: 1,
                                    p: 1,
                                    pb: 0.5,
                                    border: `1px solid ${isSelected ? theme.palette.secondary.main : theme.palette.secondary.light}`,
                                    borderRadius: 2,
                                }}
                            >
                                <IconComponent />
                            </Box>
                            <Typography
                                variant="caption"
                                align="center"
                                lineHeight={1}
                                sx={{
                                    fontWeight: isSelected ? "medium" : "normal",
                                }}
                            >
                                {category.label}
                            </Typography>
                        </CategoryButton>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default IsocronasMapCategoriesSelector;
