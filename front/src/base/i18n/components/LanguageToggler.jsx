import {useLocation} from "react-router-dom";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useLinguiI18N} from "base/i18n/lingui/Lingui18NProvider";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const LanguageToggler = () => {
    const navigate = useNavigateWithReload();
    const {pathname} = useLocation();

    const {selectedLocale, setSelectedLocale, availableLocales} = useLinguiI18N();

    const selectedValue = availableLocales.find(
        lang => lang.value === selectedLocale
    ).value;

    const handleChangeLocale = locale => {
        setSelectedLocale(locale);
        // Force navigating to same url to refresh api calls with new domains or label values
        navigate(pathname, true);
    };

    return (
        <FormControl size="small" sx={{width: "150px"}}>
            <Select
                value={selectedValue}
                onChange={e => handleChangeLocale(e.target.value)}
            >
                {availableLocales.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default LanguageToggler;
