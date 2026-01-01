import { useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface AddRateParams {
    productId: number;
    rate: number;
    comment: string;
}

export const useAddRate = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addRate = async (params: AddRateParams) => {
        try {
            setIsLoading(true);

            const response = await axiosInstance.post("/products/add-rate", {
                product_id: params.productId,
                rate: params.rate,
                comment: params.comment,
            });

            toast.success("Review submitted successfully!");

            return response.data;
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                "Failed to submit review. Please try again.";
            toast.error(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { addRate, isLoading };
};
