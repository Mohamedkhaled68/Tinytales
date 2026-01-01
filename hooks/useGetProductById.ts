import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types/Product";
export type RateItem = {
    id: number;
    user_name: string;
    rate: string;
    comment: string | null;
    diff_for_humans: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type RatesLinks = {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
};

type RatesMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
};

type RatesPagination = {
    data: RateItem[];
    links: RatesLinks;
    meta: RatesMeta;
};

type RatesSummary = {
    total_rates: number;
    avg: number;
    "1_star": number;
    "2_star": number;
    "3_star": number;
    "4_star": number;
    "5_star": number;
    can_review_product: boolean;
    rates: RatesPagination;
};

export const useGetProductById = (productId: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [rates, setRates] = useState<RatesSummary | null>(null);
    const [similar, setSimilar] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axiosInstance.get(`/products/${productId}`);
            setProduct(response.data.product_details || []);
            setRates(response.data.rates || []);
            setSimilar(response.data.similar_products || []);
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to fetch product details";
            setError(errorMessage);
            console.error("Error fetching product details:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    return {
        product,
        rates,
        similar,
        isLoading,
        error,
        refetch: fetchProduct,
    };
};
