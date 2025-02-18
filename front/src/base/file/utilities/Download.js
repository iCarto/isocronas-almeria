// https://stackoverflow.com/questions/93551
// https://stackoverflow.com/questions/40939380
function getFilenameFromHeaders(headers) {
    let filename = null;
    const utf8FilenameRegex = /filename\*=(?:(?:UTF-8'')?([^;]+))/i;
    const asciiFilenameRegex = /filename=(?:"?([^";\s]+)"?)/i;
    const contentDisposition = headers.get("Content-Disposition");
    if (!contentDisposition) {
        throw new Error("Content-Disposition header is not present");
    }

    // First, check for UTF-8 encoded filename
    const matches = utf8FilenameRegex.exec(contentDisposition);
    if (matches != null && matches[1]) {
        // Decode the URL-encoded UTF-8 filename
        filename = decodeURIComponent(matches[1]);
    } else {
        // Fallback to ASCII filename
        const asciiMatches = asciiFilenameRegex.exec(contentDisposition);
        if (asciiMatches != null && asciiMatches[1]) {
            filename = asciiMatches[1];
        }
    }
    return filename;
}

export function useDownload() {
    let download = async response => {
        const filename = getFilenameFromHeaders(response.headers);

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        const blob = await response.blob();
        const objectUrl = window.URL.createObjectURL(blob);

        anchor.download = filename;
        anchor.href = objectUrl;

        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
        document.body.removeChild(anchor);
    };

    return download;
}
