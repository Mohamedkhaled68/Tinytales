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

interface AttributeFilter {
    id: number;
    value: string;
}

export const useGetProducts = (
    categoryId: string,
    attributesProduct?: AttributeFilter[]
) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [links, setLinks] = useState<Links | null>(null);
    const [attributes, setAttributes] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const requestBody: any = {
                categories_ids: [categoryId],
            };

            if (attributesProduct && attributesProduct.length > 0) {
                requestBody.attributres_product = attributesProduct;
            }

            const response = await axiosInstance.post(`/products`, requestBody);

            setProducts(response.data.products.data || []);
            setMeta(response.data.products.meta || null);
            setLinks(response.data.products.links || null);
            setAttributes(response.data.attributes || null);
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
    }, [categoryId, JSON.stringify(attributesProduct)]);

    return {
        products,
        meta,
        links,
        attributes,
        isLoading,
        error,
        refetch: fetchProducts,
    };
};
