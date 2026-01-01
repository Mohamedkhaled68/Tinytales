"use client";
import Image from "next/image";
import RatingBar from "./RatingBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import AddReviewModal from "./AddReviewModal";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/token";
import { useAddRate } from "@/hooks/useAddRate";

const RatingAndReviews = ({
    rates,
    productId,
}: {
    rates: any;
    productId: string;
}) => {
    const { lang } = useLanguage();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addRate, isLoading } = useAddRate();

    const handleAddReviewClick = () => {
        const token = getToken();
        if (!token) {
            router.push(`/${lang}/login`);
            return;
        }
        setIsModalOpen(true);
    };

    const handleSubmitReview = async (rating: number, comment: string) => {
        await addRate({
            productId: parseInt(productId),
            rate: rating,
            comment: comment,
        });
        // Refresh the page to show new review after modal closes
        setTimeout(() => {
            router.refresh();
        }, 1500);
    };

    return (
        <>
            <div className="flex flex-col gap-0.5">
                <div className="relative w-fit">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] text-tiny-black">
                        {lang === "ar"
                            ? "التقييمات والمراجعات"
                            : "Ratings & Reviews"}
                    </h1>
                    <Image
                        src={"/images/heading-logo.svg"}
                        alt="favicon"
                        width={59}
                        height={37}
                        style={{ zIndex: "-1" }}
                        className="absolute left-0 bottom-1"
                    />
                </div>
                <div className="w-10 bg-tiny-pink h-1 rounded-2xl" />
            </div>

            <div
                className={`flex flex-col items-center justify-center lg:flex-row lg:px-20 ${
                    lang === "ar" ? "lg:flex-row-reverse" : ""
                } lg:gap-20`}
            >
                <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-[80px] font-medium font-poppins-medium text-tiny-black">
                        {rates?.avg}
                    </span>
                    <span className="text-2xl font-medium font-poppins-medium text-tiny-black-100">
                        /5
                    </span>
                </div>

                <div className="flex flex-col gap-2 mt-2 grow ">
                    <RatingBar
                        rating={Math.round(
                            (rates?.["5_star"] / 100) * 5
                        ).toString()}
                        percentage={Math.round(
                            rates?.["5_star"] || 0
                        ).toString()}
                    />
                    <RatingBar
                        rating="4"
                        percentage={Math.round(
                            rates?.["4_star"] || 0
                        ).toString()}
                    />
                    <RatingBar
                        rating="3"
                        percentage={Math.round(
                            rates?.["3_star"] || 0
                        ).toString()}
                    />
                    <RatingBar
                        rating="2"
                        percentage={Math.round(
                            rates?.["2_star"] || 0
                        ).toString()}
                    />
                    <RatingBar
                        rating="1"
                        percentage={Math.round(
                            rates?.["1_star"] || 0
                        ).toString()}
                    />
                </div>

                <div className="hidden lg:flex flex-col items-center">
                    <p className="text-[16px] font-normal font-poppins-regular text-tiny-black-300">
                        {lang === "ar" ? "إجمالي التقييمات" : "Total Reviews"}
                    </p>
                    <span className="text-6xl font-poppins-semi-bold font-semibold text-tiny-black">
                        {rates?.total_rates}
                    </span>
                    {!rates?.can_review_product && (
                        <button
                            onClick={handleAddReviewClick}
                            className="cursor-pointer mt-4 rounded-xl px-8 py-4 bg-tiny-pink font-poppins-medium font-medium text-[16px] text-white hover:bg-opacity-90 transition"
                        >
                            {lang === "ar" ? "أضف مراجعة" : "Add Review"}
                        </button>
                    )}
                </div>
            </div>

            <AddReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitReview}
                isLoading={isLoading}
            />
        </>
    );
};

export default RatingAndReviews;
