import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // Temporarily disable smooth scrolling
        const originalScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';

        // Immediately set scroll position to top before DOM paint
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);

        // Restore smooth scrolling
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = originalScrollBehavior;
        }, 100);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
