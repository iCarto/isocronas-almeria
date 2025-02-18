import {useState} from "react";

function getDescendantProp(obj, desc) {
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
}

/**Using the method sortFunction, it sorts an array by attribute in descending or ascending order depending on the order "asc"/"desc" received */
function useSort(initialSortByValue, initialOrderValue) {
    const [sortBy, setSortBy] = useState(initialSortByValue);
    const [order, setOrder] = useState(initialOrderValue);

    function sortFunction(a, b) {
        if (order === "desc") {
            if (getDescendantProp(a, sortBy) > getDescendantProp(b, sortBy)) {
                return -1;
            }
            if (getDescendantProp(b, sortBy) < getDescendantProp(a, sortBy)) {
                return 1;
            }
        } else if (order === "asc") {
            if (getDescendantProp(a, sortBy) < getDescendantProp(b, sortBy)) {
                return -1;
            }
            if (getDescendantProp(b, sortBy) > getDescendantProp(a, sortBy)) {
                return 1;
            }
        }
        return 0;
    }

    return {sortBy, setSortBy, order, setOrder, sortFunction};
}

export {useSort};
