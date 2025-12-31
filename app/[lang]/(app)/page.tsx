"use client";
import CategoriesSlider from "@/components/landing/CategoriesSlider";
import Faqs from "@/components/landing/Faqs";
import Help from "@/components/landing/Help";
import HowItWork from "@/components/landing/HowItWork";
import Reviews from "@/components/landing/Reviews";
import Slider from "@/components/landing/Slider";
import TopSeller from "@/components/landing/TopSeller";
import { useGetHome } from "@/hooks/useGetHome";
import { useCommunications } from "@/contexts/CommunicationsContext";
import { useEffect } from "react";

export default function Home() {
    const {
        sliders,
        categories,
        products,
        customer_feedback,
        faqs,
        communications,
        isLoading,
    } = useGetHome();

    const { setCommunications } = useCommunications();

    useEffect(() => {
        if (communications) {
            setCommunications(communications);
        }
    }, [communications, setCommunications]);

    return (
        <>
            <Slider sliders={sliders} />
            <CategoriesSlider categories={categories} />
            <TopSeller products={products} />
            <HowItWork />
            <Reviews customerFeedback={customer_feedback} />
            <Help />
            <Faqs faqs={faqs} />
        </>
    );
}
