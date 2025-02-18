const FileUtil = {
    convertSVGToPNG(svgData) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL("image/png");
                resolve(pngFile);
            };
            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        });
    },

    convertBase64toBlob(b64Data) {
        return fetch(b64Data).then(res => res.blob());
    },

    /**
     * Formats the size of a given file in bytes into a human-readable string with appropriate size units (Bytes, KB, MB, etc.).
     * @param {number} bytes - The size of the file in bytes to format.
     * @param {number} [decimals=2] - Number of decimals to show in the result (optional, default is 2).
     * @returns {string} Formatted string representing the file size in the appropriate unit (e.g., "1.23 MB").
     */
    formatBytes(bytes, decimals = 2) {
        if (!bytes) {
            return "";
        }
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const sizeFormatted = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
        const roundedSize =
            Math.abs(sizeFormatted - Math.floor(sizeFormatted)) >= 0.5
                ? Math.ceil(sizeFormatted)
                : Math.floor(sizeFormatted);
        return roundedSize + " " + sizes[i];
    },
};

export default FileUtil;
