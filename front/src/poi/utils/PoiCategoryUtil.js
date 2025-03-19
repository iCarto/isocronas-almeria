import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import HotelIcon from "@mui/icons-material/Hotel";
import ChurchIcon from "@mui/icons-material/Church";
import ParkIcon from "@mui/icons-material/Park";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TourIcon from "@mui/icons-material/Tour";
import RoomIcon from "@mui/icons-material/Room";
import {createIcon} from "base/map/leaflet/layer/GeojsonIcon";

const CATEGORIES = {
    Finanzas: {
        color: "#FFD700",
        icon: AccountBalanceIcon,
    },
    "Salud y bienestar": {
        color: "#FF6347",
        icon: LocalHospitalIcon,
    },
    "Alimentación y bebidas": {
        color: "#FF8C00",
        icon: RestaurantIcon,
    },
    Compras: {
        color: "#32CD32",
        icon: ShoppingBagIcon,
    },
    "Entretenimiento y ocio": {
        color: "#8A2BE2",
        icon: LocalActivityIcon,
    },
    "Cultura y educación": {
        color: "#1E90FF",
        icon: SchoolIcon,
    },
    "Gobierno e instituciones": {
        color: "#2F4F4F",
        icon: AccountBalanceWalletIcon,
    },
    Transporte: {
        color: "#4682B4",
        icon: DirectionsTransitIcon,
    },
    Alojamiento: {
        color: "#DA70D6",
        icon: HotelIcon,
    },
    "Lugares de culto": {
        color: "#A52A2A",
        icon: ChurchIcon,
    },
    "Espacios naturales": {
        color: "#228B22",
        icon: ParkIcon,
    },
    Automoción: {
        color: "#B22222",
        icon: DirectionsCarIcon,
    },
    Servicios: {
        color: "#FF4500",
        icon: MiscellaneousServicesIcon,
    },
    Deportes: {
        color: "#20B2AA",
        icon: SportsSoccerIcon,
    },
    Turismo: {
        color: "#4169E1",
        icon: TourIcon,
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
            },
        };
    };

    return {
        getStyleForCategory,
    };
}

export {usePoiCategoryUtil};
