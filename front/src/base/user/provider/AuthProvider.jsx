import {useState, createContext, useContext} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";

import {AuthService} from "base/api/service";
import {ROLES} from "../config";

let AuthContext = createContext(null);

export default function AuthProvider({children}) {
    const navigate = useNavigateWithReload();

    const [user, setUser] = useState(() => {
        return AuthService.getUsername();
    });

    const login = (username, password) => {
        return AuthService.login(username, password).then(userData => {
            console.log(userData);
            setUser(AuthService.getUsername());
        });
    };

    const logout = () => {
        return AuthService.logout().then(() => {
            setUser(null);
        });
    };

    const hasRole = role => {
        return user && user.roles && user.roles.includes(role);
    };

    let value = {
        user,
        login,
        logout,
        hasRole,
        ROLES,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export {useAuth};
