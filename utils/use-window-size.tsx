import { useEffect, useState } from 'react';

export const useWindowSize = () => {
    const hasWindow = typeof window !== 'undefined';

    if (typeof window === 'undefined') {
        return
    }

    const getWindowDimensions = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleResize = () => {
        setWindowDimensions(getWindowDimensions())
    };

    useEffect(() => {
        if (hasWindow) {
            handleResize();

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    return windowDimensions
};
