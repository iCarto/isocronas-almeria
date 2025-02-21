import {AppProvider} from "base/ui/baseApp/provider";
import {AppLayout} from "base/ui/baseApp/components";
import {IsocronasHeaderHero} from ".";

export const IsocronasLayout = () => {
    return (
        <AppProvider>
            <AppLayout hero={<IsocronasHeaderHero />} />
        </AppProvider>
    );
};

export default IsocronasLayout;
