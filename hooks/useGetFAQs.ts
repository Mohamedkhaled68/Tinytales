import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export const useGetFAQs = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFAQs = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/data/faqs`);

            setFaqs(response.data || []);
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to fetch FAQs";
            setError(errorMessage);
            toast.error("Error fetching FAQs:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFAQs();
    }, []);

    return {
        faqs,
        isLoading,
        error,
        refetch: fetchFAQs,
    };
};
