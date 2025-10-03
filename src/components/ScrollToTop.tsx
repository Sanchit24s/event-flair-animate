import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top when pathname changes - instant positioning
        window.scrollTo(0, 0);

        // Also try to scroll the document element for better compatibility
        if (document.documentElement) {
            document.documentElement.scrollTop = 0;
        }
        if (document.body) {
            document.body.scrollTop = 0;
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop; 