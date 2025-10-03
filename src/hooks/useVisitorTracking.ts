import { useEffect, useState } from 'react';
import VisitorManager from '@/services/visitorService';

interface UseVisitorTrackingResult {
    isTracking: boolean;
    counts: {
        today: number;
        thisWeek: number;
        thisMonth: number;
        thisYear: number;
        allTime: number;
    } | null;
    isNewVisitor: boolean;
    error: string | null;
}

/**
 * Custom hook for automatic visitor tracking
 * Tracks visitors when component mounts and provides visitor data
 */
export const useVisitorTracking = (): UseVisitorTrackingResult => {
    const [isTracking, setIsTracking] = useState(true);
    const [counts, setCounts] = useState<UseVisitorTrackingResult['counts']>(null);
    const [isNewVisitor, setIsNewVisitor] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const trackVisitor = async () => {
            try {
                setIsTracking(true);
                setError(null);

                // Track visitor and get counts
                const result = await VisitorManager.trackVisitor();

                setCounts(result.counts);
                setIsNewVisitor(result.isNewVisitor);

                console.log('Visitor tracked:', {
                    isNewVisitor: result.isNewVisitor,
                    counts: result.counts
                });

            } catch (err) {
                console.error('Failed to track visitor:', err);
                setError('Failed to track visitor');

                // Fallback: try to get counts without tracking
                try {
                    const fallbackResult = await VisitorManager.getVisitorCounts();
                    setCounts(fallbackResult.counts);
                } catch (fallbackErr) {
                    console.error('Fallback also failed:', fallbackErr);
                }
            } finally {
                setIsTracking(false);
            }
        };

        trackVisitor();
    }, []);

    return {
        isTracking,
        counts,
        isNewVisitor,
        error
    };
};

/**
 * Simple hook for just getting visitor counts (no tracking)
 * Useful for components that only need to display counts
 */
export const useVisitorCounts = () => {
    const [counts, setCounts] = useState<UseVisitorTrackingResult['counts']>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCounts = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await VisitorManager.getVisitorCounts();
                setCounts(result.counts);
            } catch (err) {
                console.error('Failed to load visitor counts:', err);
                setError('Failed to load visitor data');
            } finally {
                setLoading(false);
            }
        };

        loadCounts();
    }, []);

    return {
        counts,
        loading,
        error
    };
};
