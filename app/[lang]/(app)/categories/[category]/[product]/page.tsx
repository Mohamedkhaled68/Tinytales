"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Comment from "@/components/Comment";
import ProductDetails from "@/components/ProductDetails";
import ProductImagesPreview from "@/components/ProductImagesPreview";
import RatingAndReviews from "@/components/RatingAndReviews";
import { useGetProductById } from "@/hooks/useGetProductById";

const page = () => {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get("productId");
    console.log(productId);

    const { product, rates } = useGetProductById(productId as string);

    return (
        <>
            <div className="container mx-auto px-5 grow">
                <section className="flex flex-col gap-5 lg:flex-row">
                    <ProductImagesPreview />
                    <ProductDetails product={product} />
                </section>
                <section className="mt-16">
                    <RatingAndReviews rates={rates} />
                </section>
                <div className="mt-10 mb-16 flex flex-col gap-5 lg:w-[90%] mr-auto">
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

                    <button className="bg-[#F5F5F5] p-4 rounded-xl text-tiny-pink font-semibold font-poppins-semi-bold text-xs lg:text-sm w-[70%] lg:w-[30%] mx-auto">
                        View More Comments
                    </button>
                </div>
            </div>
        </>
    );
};

export default page;
