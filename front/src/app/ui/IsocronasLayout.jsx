import {AppProvider} from "base/ui/baseApp/provider";
import {AppLayout} from "base/ui/baseApp/components";
import {IsocronasHeaderHero} from ".";

// https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
const inIframe = window.self !== window.top;
// inIframe = window.frameElement ? true : false;
// inIframe = window !== window.parent ? true : false;

export const IsocronasLayout = () => {
    const hero = inIframe ? null : <IsocronasHeaderHero />;
    return (
        <AppProvider>
            <AppLayout hero={hero} />
        </AppProvider>
    );
};

export default IsocronasLayout;
