"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Comment from "@/components/Comment";
import ProductDetails from "@/components/ProductDetails";
import ProductImagesPreview from "@/components/ProductImagesPreview";
import RatingAndReviews from "@/components/RatingAndReviews";
import { useGetProductById } from "@/hooks/useGetProductById";
import { useLanguage } from "@/contexts/LanguageContext";
import Loading from "@/components/ui/Loading";

const page = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("productId");
    console.log(productId);
    const { lang } = useLanguage();

    const { product, rates, isLoading } = useGetProductById(
        productId as string
    );

    return (
        <>
            <div className="container mx-auto px-5 grow">
                {isLoading ? (
                    <>
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loading width="100" height="100" />
                        </div>
                    </>
                ) : (
                    <>
                        <section className="flex flex-col gap-5 lg:flex-row">
                            <ProductImagesPreview />
                            <ProductDetails product={product} />
                        </section>
                        <section className="mt-16">
                            <RatingAndReviews rates={rates} />
                        </section>
                        <div className="mt-10 mb-16 flex flex-col gap-5">
                            {rates &&
                                rates.rates.data.map((comment) => {
                                    if (!comment.comment) {
                                        return null;
                                    } else {
                                        return (
                                            <Comment
                                                key={comment.id}
                                                comment={comment}
                                            />
                                        );
                                    }
                                })}

                            <button className="cursor-pointer bg-[#F5F5F5] p-4 rounded-xl text-tiny-pink font-semibold font-poppins-semi-bold text-xs lg:text-sm w-[70%] lg:w-[30%] mx-auto">
                                {lang === "ar"
                                    ? "عرض المزيد من التعليقات"
                                    : "View More Comments"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default page;
