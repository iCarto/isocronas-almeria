import {useErrors} from "base/error/provider";
import {DocumentService} from "base/file/service";

export function useDownloadDocument() {
    const {handleErrors} = useErrors();

    let downloadDocument = async (name, path, content_type) => {
        try {
            const response = await DocumentService.download(path, content_type);

            let anchor = document.createElement("a");
            document.body.appendChild(anchor);

            const blob = await response.blob();
            const objectUrl = window.URL.createObjectURL(blob);

            anchor.download = name;
            anchor.href = objectUrl;

            anchor.click();

            window.URL.revokeObjectURL(objectUrl);
            document.body.removeChild(anchor);
        } catch (error) {
            handleErrors(error);
        }
    };

    return downloadDocument;
}
