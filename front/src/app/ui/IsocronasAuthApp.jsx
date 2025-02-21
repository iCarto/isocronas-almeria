import {IsocronasLayout} from "app/ui";
import {DomainProvider} from "base/domain/provider";

export const IsocronasAuthApp = () => {
    return (
        // <LocationProvider>
        <DomainProvider dataSource="json">
            <IsocronasLayout />
        </DomainProvider>
        // </LocationProvider>
    );
};

export default IsocronasAuthApp;
