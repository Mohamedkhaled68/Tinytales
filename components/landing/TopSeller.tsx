import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import ProductCard from "../ProductCard";

const products = [
    {
        id: 1,
        name: "Kids Cotton T-shirt (has variants)",
        is_cart: false,
        cart_item_id: null,
        is_favorite: false,
        description:
            "Soft and light T-shirt perfect for summer days, made from pure cotton for children's sensitive skin.",
        categories: [
            {
                id: 24,
                name: "Category 16",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
            {
                id: 50,
                name: "Category 42",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
            {
                id: 51,
                name: "Category 43",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
        ],
        price: "71.00",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
        price_before_discount: null,
        discount_percentage: null,
        stock: 4680,
        rates: {
            count: 41,
            avg: "3.15",
        },
        color_list: [],
    },
    {
        id: 3,
        name: "Kids Sleepwear Set (has variants)",
        is_cart: false,
        cart_item_id: null,
        is_favorite: false,
        description:
            "Comfortable cotton sleepwear set for a peaceful night's sleep.",
        categories: [
            {
                id: 41,
                name: "Category 33",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
        ],
        price: "108.00",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
        price_before_discount: null,
        discount_percentage: null,
        stock: 4047,
        rates: {
            count: 42,
            avg: "3.21",
        },
        color_list: [],
    },
    {
        id: 6,
        name: "Girls Formal Dress",
        is_cart: false,
        cart_item_id: null,
        is_favorite: false,
        description:
            "Elegant dress for parties and events, with soft design and calm colors.",
        categories: [
            {
                id: 13,
                name: "Category 5",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
        ],
        price: "160.00",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
        price_before_discount: "197.00",
        discount_percentage: "18.78",
        stock: 4215,
        rates: {
            count: 45,
            avg: "3.13",
        },
        color_list: [],
    },
    {
        id: 9,
        name: "Kids Cardigan",
        is_cart: false,
        cart_item_id: null,
        is_favorite: false,
        description:
            "Soft and warm cardigan for fall and winter, easy to style with any outfit.",
        categories: [
            {
                id: 13,
                name: "Category 5",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
            {
                id: 18,
                name: "Category 10",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
            {
                id: 8,
                name: "Age 9-14 years",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
        ],
        price: "319.00",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
        price_before_discount: "373.00",
        discount_percentage: "14.48",
        stock: 2083,
        rates: {
            count: 45,
            avg: "3.2",
        },
        color_list: [],
    },
    {
        id: 12,
        name: "Kids Winter Jacket (has variants)",
        is_cart: false,
        cart_item_id: null,
        is_favorite: false,
        description:
            "Padded cold-resistant jacket, ideal for UAE’s mild winter.",
        categories: [
            {
                id: 32,
                name: "Category 24",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
        ],
        price: "110.00",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
        price_before_discount: null,
        discount_percentage: null,
        stock: 1156,
        rates: {
            count: 41,
            avg: "3.17",
        },
        color_list: [],
    },
    {
        id: 13,
        name: "Kids Tracksuit Set (has variants)",
        is_cart: false,
        cart_item_id: null,
        is_favorite: false,
        description:
            "Comfortable tracksuit set for active kids, with a trendy design.",
        categories: [
            {
                id: 7,
                name: "Age 4-8 years",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
        ],
        price: "101.00",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
        price_before_discount: null,
        discount_percentage: null,
        stock: 4763,
        rates: {
            count: 34,
            avg: "2.94",
        },
        color_list: ["#28A745", "#FFA500"],
    },
    {
        id: 14,
        name: "Wool Kids Sweater",
        is_cart: false,
        cart_item_id: null,
        is_favorite: false,
        description: "Soft and warm wool sweater in vibrant colors.",
        categories: [
            {
                id: 17,
                name: "Category 9",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
            {
                id: 26,
                name: "Category 18",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
            {
                id: 48,
                name: "Category 40",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
        ],
        price: "345.00",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
        price_before_discount: "409.00",
        discount_percentage: "15.65",
        stock: 3400,
        rates: {
            count: 43,
            avg: "2.4",
        },
        color_list: [],
    },
    {
        id: 16,
        name: "Kids Party Dress (has variants)",
        is_cart: false,
        cart_item_id: null,
        is_favorite: false,
        description: "Fancy dress with glitter and shine, perfect for parties.",
        categories: [
            {
                id: 5,
                name: "Girls",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
            {
                id: 7,
                name: "Age 4-8 years",
                image: "https://tinytales.trendline.marketing/default-images/default.png",
            },
        ],
        price: "150.00",
        image: "https://tinytales.trendline.marketing/default-images/default.png",
        price_before_discount: null,
        discount_percentage: null,
        stock: 4399,
        rates: {
            count: 44,
            avg: "2.82",
        },
        color_list: [],
    },
];

const TopSeller = () => {
    return (
        <section className="mt-14 container mx-auto px-5">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <div className="relative w-fit">
                        <h1 className="font-poppins-semi-bold font-semibold text-[16px] text-tiny-black">
                            Our Top Sellers Products
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

                <div className="flex items-center gap-1">
                    <span className="text-xs lg:text-[16px] font-poppins-semi-bold font-semibold text-tiny-pink lg:text-tiny-grey">
                        View All Item
                    </span>
                    <FaArrowRight className="inline-block ml-2 text-tiny-pink lg:text-tiny-grey" />
                </div>
            </div>

            <div className="mt-11">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.25 gap-y-4 lg:gap-x-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={`1`}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopSeller;
