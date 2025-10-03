import apiClient from "../api/apiClient";

// Define TypeScript interfaces
export interface VisitorCounts {
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    allTime: number;
}

export interface VisitorGrowth {
    dailyGrowth: number;
    weeklyGrowth: number;
    monthlyGrowth: number;
}

export interface VisitorTrackingResponse {
    success: boolean;
    isNewVisitor: boolean;
    counts: VisitorCounts;
    visitorId: string;
}

export interface VisitorCountsResponse {
    success: boolean;
    counts: VisitorCounts;
}

export interface VisitorStatsResponse {
    success: boolean;
    counts: VisitorCounts;
    growth: VisitorGrowth;
    timestamp: string;
}

export interface VisitorIdResponse {
    success: boolean;
    visitorId: string;
}

// Track visitor and get counts
export const trackVisitor = (visitorId: string) => {
    return apiClient.post<VisitorTrackingResponse>("/visitor-count", { visitorId });
};

// Get visitor counts without tracking
export const getVisitorCounts = () => {
    return apiClient.get<VisitorCountsResponse>("/visitor-count");
};

// Get enhanced visitor statistics
export const getVisitorStats = () => {
    return apiClient.get<VisitorStatsResponse>("/visitor-count/stats");
};

// Generate new visitor ID
export const generateVisitorId = () => {
    return apiClient.get<VisitorIdResponse>("/visitor-count/id");
};

// Frontend visitor management utilities
class VisitorManager {
    private static readonly VISITOR_ID_KEY = 'namah_visitor_id';
    private static readonly LAST_VISIT_KEY = 'namah_last_visit';

    /**
     * Generate a unique visitor ID
     */
    private static generateVisitorId(): string {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 15);
        return `visitor_${timestamp}_${randomStr}`;
    }

    /**
     * Get or create visitor ID from localStorage
     */
    private static getVisitorId(): string {
        let visitorId = localStorage.getItem(this.VISITOR_ID_KEY);

        if (!visitorId) {
            visitorId = this.generateVisitorId();
            localStorage.setItem(this.VISITOR_ID_KEY, visitorId);
        }

        return visitorId;
    }

    /**
     * Check if visitor should be tracked (not same day)
     */
    private static shouldTrackVisitor(): boolean {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem(this.LAST_VISIT_KEY);

        if (lastVisit !== today) {
            localStorage.setItem(this.LAST_VISIT_KEY, today);
            return true;
        }

        return false;
    }

    /**
     * Track visitor and get counts
     */
    static async trackVisitor(): Promise<VisitorTrackingResponse> {
        try {
            const visitorId = this.getVisitorId();
            const shouldTrack = this.shouldTrackVisitor();

            let response;

            if (shouldTrack) {
                // Track visitor and get counts
                response = await trackVisitor(visitorId);
            } else {
                // Just get counts without tracking
                response = await getVisitorCounts();
            }

            return response.data;
        } catch (error) {
            console.error('Error tracking visitor:', error);
            throw error;
        }
    }

    /**
     * Get visitor counts without tracking
     */
    static async getVisitorCounts(): Promise<VisitorCountsResponse> {
        try {
            const response = await getVisitorCounts();
            return response.data;
        } catch (error) {
            console.error('Error getting visitor counts:', error);
            throw error;
        }
    }

    /**
     * Get enhanced visitor statistics
     */
    static async getVisitorStats(): Promise<VisitorStatsResponse> {
        try {
            const response = await getVisitorStats();
            return response.data;
        } catch (error) {
            console.error('Error getting visitor stats:', error);
            throw error;
        }
    }

    /**
     * Clear visitor data (for testing)
     */
    static clearVisitorData(): void {
        localStorage.removeItem(this.VISITOR_ID_KEY);
        localStorage.removeItem(this.LAST_VISIT_KEY);
    }
}

export default VisitorManager;