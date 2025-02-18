import {useState, useEffect} from "react";

export function useScrollTop(threshold = 330) {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > threshold) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener("scroll", checkScroll);

        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    }, [threshold]);

    const handleScrollTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
        setShowScrollButton(false);
    };

    return {showScrollButton, handleScrollTop};
}
