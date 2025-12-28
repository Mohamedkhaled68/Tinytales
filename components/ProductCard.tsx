import { Product } from "@/types/Product";
import Image from "next/image";
import { GiRoundStar } from "react-icons/gi";

interface ProductCardProps {
    image: string;
    product: Product;
}

const ProductCard = ({ image, product }: ProductCardProps) => {
    return (
        <>
            <div className="flex flex-col gap-2  w-full">
                {/* Image & Offers */}
                <div className="rounded-[20px] border border-black/5 flex flex-col gap-4 overflow-hidden p-3">
                    <div className="flex items-center justify-between">
                        {product.discount_percentage && (
                            <div className="rounded-lg border border-[#4040401A] text-tiny-pink text-[10px] font-poppins-semibold font-semibold py-1.5 px-2 lg:py-2 lg:px-4">
                                {product.discount_percentage}% OFF
                            </div>
                        )}
                        <div
                            className={`flex items-center gap-1.25 ml-auto ${
                                product.discount_percentage ? "" : "ml-auto"
                            }`}
                        >
                            <div className="rounded-lg border w-8 h-8 border-[#4040401A] text-tiny-pink text-[10px] font-poppins-semibold font-semibold p-1.5">
                                <div className="relative w-5 h-5 flex justify-center items-center">
                                    {product.is_cart ? (
                                        <Image
                                            src={"/icons/bag-fill.svg"}
                                            fill
                                            alt="bag-fill icon"
                                        />
                                    ) : (
                                        <Image
                                            src={"/icons/bag-outline.svg"}
                                            fill
                                            alt="bag-fill icon"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="rounded-lg border w-8 h-8 border-[#4040401A] text-tiny-pink text-[10px] font-poppins-semibold font-semibold p-1.5">
                                <div className="relative w-5 h-5 flex justify-center items-center">
                                    {product.is_favorite ? (
                                        <Image
                                            src={"/icons/heart-fill.svg"}
                                            fill
                                            alt="heart-fill icon"
                                        />
                                    ) : (
                                        <Image
                                            src={"/icons/heart-outline.svg"}
                                            fill
                                            alt="heart-fill icon"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full h-49.5">
                        <Image
                            src={`/images/similar-item${image}.webp`}
                            fill
                            alt={`similar item ${image}`}
                            style={{ objectFit: "contain" }}
                            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h1 className="font-poppins-medium font-medium text-xs text-tiny-black-300">
                            {product.name}
                        </h1>

                        <div className="flex justify-between items-center gap-1">
                            <GiRoundStar size={13} className="text-tiny-pink" />
                            <span className="font-poppins-medium font-medium text-xs text-tiny-black">
                                {product.rates.avg}
                            </span>
                            <span className="font-poppins-regular font-normal text-[10px] text-tiny-black-300">
                                ({product.rates.count})
                            </span>
                        </div>
                    </div>
                    <h1 className="font-poppins-medium font-medium text-[10px] lg:text-sm text-tiny-black">
                        {product.description}
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="font-poppins-medium font-medium text-sm lg:text-[16px] text-tiny-black">
                            AED {product.price}
                        </span>
                        {product.price_before_discount && (
                            <span className="font-poppins-medium font-medium text-xs lg:text-sm text-tiny-black-200 line-through">
                                AED {product.price_before_discount}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        {product.color_list.length > 0 &&
                            product.color_list
                                .slice(0, 3)
                                .map((color, index) => (
                                    <div
                                        key={index}
                                        className="w-5 h-5 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                        {product.color_list.length > 3 && (
                            <span className="font-poppins-medium font-medium text-xs text-tiny-black-300">
                                +{product.color_list.length - 3} More
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
