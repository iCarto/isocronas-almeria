const TextUtil = {
    capitalize(value) {
        if (!value) {
            return value;
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    },

    convertDBTags(dbTag) {
        const words = dbTag.split("_").map(word => {
            if (word.length >= 1 && word.length <= 3) {
                return word;
            }
            return this.capitalize(word);
        });

        const result = words.join(" ");

        return this.capitalize(result);
    },

    getAcronym(label) {
        return label?.split(/[\s-]/).reduce(function (accumulator, word) {
            return accumulator + word.charAt(0);
        }, "");
    },

    truncateText(text, maxLength = 50) {
        if (!text) return "";
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    },
};

export default TextUtil;
