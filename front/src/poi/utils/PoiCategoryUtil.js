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

function usePoiCategoryUtil() {
    const getStyleForCategory = category => {
        switch (category) {
            case "Finanzas":
                return {
                    color: "#FFD700",
                    icon: AccountBalanceIcon,
                };
            case "Salud y bienestar":
                return {
                    color: "#FF6347",
                    icon: LocalHospitalIcon,
                };
            case "Alimentación y bebidas":
                return {
                    color: "#FF8C00",
                    icon: RestaurantIcon,
                };
            case "Compras":
                return {
                    color: "#32CD32",
                    icon: ShoppingBagIcon,
                };
            case "Entretenimiento y ocio":
                return {
                    color: "#8A2BE2",
                    icon: LocalActivityIcon,
                };
            case "Cultura y educación":
                return {
                    color: "#1E90FF",
                    icon: SchoolIcon,
                };
            case "Gobierno e instituciones":
                return {
                    color: "#2F4F4F",
                    icon: AccountBalanceWalletIcon,
                };
            case "Transporte":
                return {
                    color: "#4682B4",
                    icon: DirectionsTransitIcon,
                };
            case "Alojamiento":
                return {
                    color: "#DA70D6",
                    icon: HotelIcon,
                };
            case "Lugares de culto":
                return {
                    color: "#A52A2A",
                    icon: ChurchIcon,
                };
            case "Espacios naturales":
                return {
                    color: "#228B22",
                    icon: ParkIcon,
                };
            case "Automoción":
                return {
                    color: "#B22222",
                    icon: DirectionsCarIcon,
                };
            case "Servicios":
                return {
                    color: "#FF4500",
                    icon: MiscellaneousServicesIcon,
                };
            case "Deportes":
                return {
                    color: "#20B2AA",
                    icon: SportsSoccerIcon,
                };
            case "Turismo":
                return {
                    color: "#4169E1",
                    icon: TourIcon,
                };
            default:
                return {
                    color: "#333333",
                    icon: RoomIcon,
                };
        }
    };

    return {
        getStyleForCategory,
    };
}

export {usePoiCategoryUtil};
