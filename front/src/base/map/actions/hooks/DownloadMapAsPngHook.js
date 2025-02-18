import domtoimage from "dom-to-image";
import {useMapContext} from "../../MapProvider";
import {FileUtil} from "base/file/utilities";

export function useDownloadMapAsPng() {
    const {mapDOMRef, mapObjectRef} = useMapContext();

    const getDimensions = () => {
        return mapObjectRef.current.getSize();
    };

    const generate = async () => {
        var dimensions = getDimensions();

        const dataUrl = await domtoimage.toPng(mapDOMRef.current, {
            width: dimensions.x,
            height: dimensions.y,
        });
        return dataUrl;
    };

    const download = async callback => {
        const dataURL = await generate();

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        const blob = await FileUtil.convertBase64toBlob(dataURL);
        const objectUrl = window.URL.createObjectURL(blob);

        anchor.download = "map.png";
        anchor.href = objectUrl;

        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
        document.body.removeChild(anchor);

        if (callback) {
            callback();
        }
    };

    return {download};
}
