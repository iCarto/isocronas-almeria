import {useState, useEffect, useRef} from "react";

const useContainerHeight = (initialHeight = 600) => {
    const [containerHeight, setContainerHeight] = useState(initialHeight);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const initialHeight = container.getBoundingClientRect().height;
            setContainerHeight(initialHeight);

            const observer = new ResizeObserver(entries => {
                for (let entry of entries) {
                    setContainerHeight(entry.contentRect.height);
                }
            });

            observer.observe(container);

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return {containerRef, containerHeight};
};

export default useContainerHeight;
