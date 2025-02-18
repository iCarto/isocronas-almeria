import {UserService} from "base/user/service";
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER} from "base/user/config";
import {Storage} from "base/storage";
import {ErrorUtil} from "base/error/utilities";

function storeTokensInStorage(accessToken, refreshToken) {
    let tokenDataToStore = {};
    Object.defineProperty(tokenDataToStore, ACCESS_TOKEN_KEY, {
        value: accessToken,
        writable: false,
        enumerable: true,
        configurable: false,
    });
    Object.defineProperty(tokenDataToStore, REFRESH_TOKEN_KEY, {
        value: refreshToken,
        writable: false,
        enumerable: true,
        configurable: false,
    });
    Storage.set(USER, JSON.stringify(tokenDataToStore));
}

const AuthService = {
    login(username, password) {
        return UserService.login(username, password)
            .then(tokenData => {
                storeTokensInStorage(tokenData.access, tokenData.refresh);
                let tokenInfo = JSON.parse(atob(tokenData.access.split(".")[1]));
                return tokenInfo.username;
            })
            .catch(error => {
                ErrorUtil.handleError(error);
            });
    },

    refreshToken() {
        const refresh = AuthService.getRefreshToken();
        if (!refresh) {
            return window.location.replace("/logout");
        }
        return UserService.refresh(refresh).then(tokenData => {
            storeTokensInStorage(tokenData.access, refresh);
            return tokenData;
        });
    },

    logout() {
        return new Promise((resolve, reject) => {
            Storage.remove(USER);
            resolve(true);
        });
    },

    getAccessToken() {
        return AuthService.getUserStoredData(ACCESS_TOKEN_KEY);
    },

    getRefreshToken() {
        return AuthService.getUserStoredData(REFRESH_TOKEN_KEY);
    },

    getUserStoredData(storedDataId) {
        const token = Storage.get(USER);
        if (!token) {
            return null;
        }
        const userStoredData = JSON.parse(token);
        return userStoredData[storedDataId];
    },

    getUsername() {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return null;
        }
        let tokenData = JSON.parse(atob(accessToken.split(".")[1]));
        return {
            id: tokenData.id,
            username: tokenData.username,
            name: tokenData.first_name
                ? `${tokenData.first_name} ${tokenData.last_name}`
                : tokenData.username,
            last_login: tokenData.last_login,
            is_superuser: tokenData.is_superuser,
            roles: tokenData.groups,
            island: tokenData.island,
            active_islands: tokenData.active_islands,
        };
    },
};

export default AuthService;
