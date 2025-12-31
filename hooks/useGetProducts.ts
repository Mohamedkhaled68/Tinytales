import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types/Product";

interface Links {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

interface Meta {
    current_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export const useGetProducts = (categoryId: string) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [links, setLinks] = useState<Links | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axiosInstance.post(`/products`, {
                categories_ids: [categoryId],
            });

            console.log(response);

            setProducts(response.data.products.data || []);
            setMeta(response.data.products.meta || null);
            setLinks(response.data.products.links || null);
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to fetch products";
            setError(errorMessage);
            console.error("Error fetching products:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        meta,
        links,
        isLoading,
        error,
        refetch: fetchProducts,
    };
};
