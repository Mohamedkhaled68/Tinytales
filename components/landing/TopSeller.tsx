import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import ProductCard from "../ProductCard";
import { Product } from "@/types/Product";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const TopSeller = ({ products }: { products: Product[] }) => {
    const { lang } = useLanguage();
    return (
        <section className="mt-14 container mx-auto px-5">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <div className="relative w-full">
                        <h1 className="font-poppins-semi-bold font-semibold text-[16px] lg:text-[24px] text-tiny-black">
                            {lang === "ar"
                                ? "أفضل المنتجات مبيعًا"
                                : "Our Top Seller Products"}
                        </h1>
                        <Image
                            src={"/images/heading-logo.svg"}
                            alt="favicon"
                            width={100}
                            height={70}
                            style={{ zIndex: "-1" }}
                            className={`absolute w-18 lg:w-25 ${
                                lang === "ar"
                                    ? "-right-2 scale-x-[-1]"
                                    : "left-0"
                            } bottom-1`}
                        />
                    </div>
                    <div className="w-10 bg-tiny-pink h-1 rounded-2xl" />
                </div>

                <Link href={"/categories"} className="flex items-center gap-1">
                    <span className="hover:underline text-xs lg:text-[16px] font-poppins-semi-bold font-semibold text-tiny-pink lg:text-tiny-grey">
                        {lang === "ar" ? "اعرض المزيد" : "View More"}
                    </span>
                    <FaArrowRight
                        className={`inline-block ${
                            lang === "ar" ? "rotate-180 mr-2" : "ml-2"
                        } text-tiny-pink lg:text-tiny-grey`}
                    />
                </Link>
            </div>

            <div className="mt-11">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.25 gap-y-4 lg:gap-x-4">
                    {products.map((product) => (
                        <Link
                            href={`${lang}/categories/${product.categories[0].id}/product-details?productId=${product.id}`}
                            key={product.id}
                        >
                            <ProductCard
                                image={`1`}
                                product={product}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopSeller;
