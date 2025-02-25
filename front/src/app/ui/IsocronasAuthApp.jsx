import {IsocronasLayout} from "app/ui";
import {IsocronasUrlParamsProvider} from "app/urlParams/provider";
import {DomainProvider} from "base/domain/provider";

export const IsocronasAuthApp = () => {
    return (
        <DomainProvider dataSource="json">
            <IsocronasUrlParamsProvider>
                <IsocronasLayout />
            </IsocronasUrlParamsProvider>
        </DomainProvider>
    );
};

export default IsocronasAuthApp;
