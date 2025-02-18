import {t} from "@lingui/macro";

import {ApiService} from "base/api/service";

const basePath = "/api/users/token/";
const userNotFoundMessage = t`User not found. Please try again or contact your system administrator.`;
const passwordNotCorrectMessage = t`Incorrect password. Please try again or contact your system administrator.`;

const UserService = {
    fakeLogin(username, password) {
        return ApiService.get("/api/users").then(response => {
            console.log({response});
            var responseData = {
                type: "",
                message: "",
            };
            if (
                response.some(
                    user => user.username === username && user.password === password
                )
            ) {
                return true;
            } else if (
                response.some(
                    user => user.username === username && user.password !== password
                )
            ) {
                responseData.type = "passwordNotCorrect";
                responseData.message = passwordNotCorrectMessage;
                return responseData;
            }
            responseData.type = "userNotFound";
            responseData.message = userNotFoundMessage;
            return responseData;
        });
    },

    login(username, password) {
        return ApiService.post(basePath, {username, password}).then(response => {
            return response;
        });
    },

    refresh(refresh) {
        return ApiService.post(`${basePath}refresh/`, {refresh}).then(response => {
            return response;
        });
    },
};

export default UserService;
