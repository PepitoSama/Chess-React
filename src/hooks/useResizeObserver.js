import { useEffect, useState } from 'react';

export const useResizeObserver = ref => {
    const [dimensions, setDimensions] = useState(null);
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            setDimensions(entries[0].contentRect);
        });
        resizeObserver.observe(observeTarget);
        return () => resizeObserver.unobserve(observeTarget);
    }, [ref]);
    return dimensions;
};

export default useResizeObserver;
