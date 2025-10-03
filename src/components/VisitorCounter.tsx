import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import VisitorManager from '@/services/visitorService';

interface VisitorCounts {
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    allTime: number;
}

interface VisitorCounterProps {
    className?: string;
    showGrowth?: boolean;
    compact?: boolean;
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({
    className = '',
    showGrowth = false,
    compact = false
}) => {
    const [counts, setCounts] = useState<VisitorCounts | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isNewVisitor, setIsNewVisitor] = useState(false);

    useEffect(() => {
        const trackVisitor = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await VisitorManager.trackVisitor();
                setCounts(result.counts);
                setIsNewVisitor(result.isNewVisitor);
            } catch (err) {
                console.error('Failed to track visitor:', err);
                setError('Failed to load visitor data');

                // Fallback: try to get counts without tracking
                try {
                    const fallbackResult = await VisitorManager.getVisitorCounts();
                    setCounts(fallbackResult.counts);
                } catch (fallbackErr) {
                    console.error('Fallback also failed:', fallbackErr);
                }
            } finally {
                setLoading(false);
            }
        };

        trackVisitor();
    }, []);

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className={`${className} ${compact ? 'p-4' : 'p-6'} bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50`}>
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                    <span className="ml-3 text-gray-600">Loading visitor data...</span>
                </div>
            </div>
        );
    }

    if (error || !counts) {
        return (
            <div className={`${className} ${compact ? 'p-4' : 'p-6'} bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50`}>
                <div className="text-center text-gray-500">
                    <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>Unable to load visitor data</p>
                </div>
            </div>
        );
    }

    const stats = [
        {
            label: 'Today',
            value: counts.today,
            icon: Clock,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'This Week',
            value: counts.thisWeek,
            icon: Calendar,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            label: 'This Month',
            value: counts.thisMonth,
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            label: 'All Time',
            value: counts.allTime,
            icon: Users,
            color: 'text-gold',
            bgColor: 'bg-gold/10'
        }
    ];

    return (
        <motion.div
            className={`${className} ${compact ? 'p-4' : 'p-6'} bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <div className="text-center mb-6">
                <motion.div
                    className="flex items-center justify-center mb-2"
                    variants={itemVariants}
                >
                    <Users className="h-6 w-6 text-gold mr-2" />
                    <h3 className="font-playfair text-xl font-bold text-navy">
                        Unique Visitors
                    </h3>
                </motion.div>

                {isNewVisitor && (
                    <motion.div
                        className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium"
                        variants={itemVariants}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Welcome! You're visitor #{formatNumber(counts.allTime)}
                    </motion.div>
                )}
            </div>

            {/* Stats Grid */}
            <div className={`grid ${compact ? 'grid-cols-2 gap-3' : 'grid-cols-2 lg:grid-cols-4 gap-4'}`}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        className={`${stat.bgColor} rounded-xl p-4 text-center`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                        <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                            {formatNumber(stat.value)}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer */}
            <motion.div
                className="mt-4 text-center text-xs text-gray-500"
                variants={itemVariants}
            >
                <p>Real-time visitor tracking</p>
                <p className="mt-1">
                    Last updated: {new Date().toLocaleTimeString()}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default VisitorCounter;
