import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SchoolIcon from "@mui/icons-material/School";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import ParkIcon from "@mui/icons-material/Park";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import RoomIcon from "@mui/icons-material/Room";
import {createIcon} from "base/map/leaflet/layer/GeojsonIcon";

const CATEGORIES = {
    Cultura: {
        color: "#FFD700",
        icon: AccountBalanceIcon,
    },
    Educación: {
        color: "#1E90FF",
        icon: SchoolIcon,
    },
    Restauración: {
        color: "#FF8C00",
        icon: RestaurantIcon,
    },
    Salud: {
        color: "#FF6347",
        icon: LocalHospitalIcon,
    },
    "Aire libre": {
        color: "#228B22",
        icon: ParkIcon,
    },
    Servicios: {
        color: "#FF4500",
        icon: MiscellaneousServicesIcon,
    },
    Compras: {
        color: "#32CD32",
        icon: ShoppingBagIcon,
    },
    Deportes: {
        color: "#20B2AA",
        icon: SportsSoccerIcon,
    },
    Transporte: {
        color: "#4682B4",
        icon: DirectionsTransitIcon,
    },

    default: {
        color: "#333333",
        icon: RoomIcon,
    },
};

function usePoiCategoryUtil() {
    const getCategoryName = category => {
        return CATEGORIES[category] ? category : "default";
    };

    const getCategoryNames = () => {
        return Object.keys(CATEGORIES).filter(category => category !== "default");
    };

    const getStyleForCategory = category => {
        return {
            color: CATEGORIES[getCategoryName(category)].color,
            icon: CATEGORIES[getCategoryName(category)].icon,
            mapIcon: {
                normal: createIcon(CATEGORIES[getCategoryName(category)].icon, {
                    color: CATEGORIES[getCategoryName(category)].color,
                    size: 20,
                }),
                highlighted: createIcon(CATEGORIES[getCategoryName(category)].icon, {
                    color: "white",
                    backgroundColor: CATEGORIES[getCategoryName(category)].color,
                    size: 32,
                }),
                selected: createIcon(CATEGORIES[getCategoryName(category)].icon, {
                    color: "white",
                    backgroundColor: CATEGORIES[getCategoryName(category)].color,
                    size: 40,
                }),
            },
        };
    };

    return {
        getStyleForCategory,
        getCategoryNames,
    };
}

export {usePoiCategoryUtil};
