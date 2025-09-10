import apiClient from "../api/apiClient";

// Define TypeScript interfaces
export interface ContactSubmission {
    _id?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    event_type: "wedding" | "corporate" | "private" | "other";
    message: string;
    status?: "pending" | "contacted";
    createdAt?: string;
    updatedAt?: string;
}

// Define the API response type
export type GetSubmissionsResponse = {
    success: boolean;
    data: ContactSubmission[];
    total: number;
    page: number;
    totalPages: number;
};

// Params for fetching submissions
export type GetSubmissionsParams = {
    search?: string;
    event_type?: string;
    status?: "pending" | "contacted";
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
    sort?: "newest" | "oldest";
};

// Create new submission
export const createContactSubmission = (data: ContactSubmission) => {
    return apiClient.post<ContactSubmission>("/contact/create", data);
};

// Update submission status
export const updateContactStatus = (
    id: string,
    status: "pending" | "contacted"
) => {
    return apiClient.put<ContactSubmission>(`/contact/update/${id}`, { status });
};

// Get submissions with filters & pagination
export const getSubmissions = async (
    params?: GetSubmissionsParams
): Promise<GetSubmissionsResponse> => {
    const response = await apiClient.get<GetSubmissionsResponse>(
        "/contact/get",
        { params }
    );
    return response.data;
};