import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { Category, Product } from "@/types/Product";
import { Communications, CustomerFeedback, FAQ, Slider } from "@/types/Home";



export const useGetHome = () => {
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [customer_feedback, setCustomerFeedback] = useState<
        CustomerFeedback[]
    >([]);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [communications, setCommunications] = useState<Communications | null>(
        null
    );

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHome = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/home`);

            setSliders(response.data.sliders || []);
            setCategories(response.data.categories || []);
            setCustomerFeedback(response.data.customer_feedback || []);
            setFaqs(response.data.faqs || []);
            setProducts(response.data.products || []);
            setCommunications(response.data.communications || null);
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to fetch categories";
            setError(errorMessage);
            console.error("Error fetching categories:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHome();
    }, []);

    return {
        categories,
        sliders,
        customer_feedback,
        faqs,
        products,
        communications,
        isLoading,
        error,
        refetch: fetchHome,
    };
};
