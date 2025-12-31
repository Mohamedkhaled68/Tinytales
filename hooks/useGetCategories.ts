import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

interface Category {
    id: number;
    name: string;
}
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

export const useGetCategories = (page?: string) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [links, setLinks] = useState<Links | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axiosInstance.get(
                `/data/categories?page=${page}`
            );

            setCategories(response.data.data || []);
            setMeta(response.data.meta || null);
            setLinks(response.data.links || null);
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
        fetchCategories();
    }, [page]);

    return {
        categories,
        meta,
        links,
        isLoading,
        error,
        refetch: fetchCategories,
    };
};
