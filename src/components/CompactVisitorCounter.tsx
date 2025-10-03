import React, { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import VisitorManager from '@/services/visitorService';

interface VisitorCounts {
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    allTime: number;
}

interface CompactVisitorCounterProps {
    className?: string;
    counts?: VisitorCounts | null;
    loading?: boolean;
    error?: string | null;
}

const CompactVisitorCounter: React.FC<CompactVisitorCounterProps> = ({
    className = '',
    counts: propCounts,
    loading: propLoading,
    error: propError
}) => {
    const [counts, setCounts] = useState<VisitorCounts | null>(propCounts || null);
    const [loading, setLoading] = useState(propLoading ?? true);
    const [error, setError] = useState<string | null>(propError || null);

    useEffect(() => {
        // If counts are provided as props, use them
        if (propCounts) {
            setCounts(propCounts);
            setLoading(false);
            setError(null);
            return;
        }

        // Otherwise, fetch counts
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
    }, [propCounts]);

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    if (loading) {
        return (
            <div className={`${className} bg-white rounded-lg shadow-sm border p-4`}>
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold"></div>
                    <span className="ml-2 text-sm text-gray-600">Loading...</span>
                </div>
            </div>
        );
    }

    if (error || !counts) {
        return (
            <div className={`${className} bg-white rounded-lg shadow-sm border p-4`}>
                <div className="text-center text-gray-500">
                    <Users className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Unable to load visitor data</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className={`${className} bg-white rounded-lg shadow-sm border p-4`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <Users className="h-5 w-5 text-gold mr-2" />
                    <h3 className="font-semibold text-gray-900">Visitors</h3>
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gold">
                        {formatNumber(counts.today)}
                    </div>
                    <div className="text-xs text-gray-600">Today</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-navy">
                        {formatNumber(counts.allTime)}
                    </div>
                    <div className="text-xs text-gray-600">All Time</div>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                    <span>This Week: {formatNumber(counts.thisWeek)}</span>
                    <span>This Month: {formatNumber(counts.thisMonth)}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default CompactVisitorCounter;
