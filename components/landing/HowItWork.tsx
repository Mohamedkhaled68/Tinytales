import Image from "next/image";

const steps = [
    {
        title: "Sign in",
        description:
            "Enter your account details to access all features easily.",
    },
    {
        title: "Add to Cart",
        description: "Easily add selected products to your cart.",
    },
    {
        title: "Complete Order",
        description: "Enter details and select payment.",
    },
    {
        title: "Shipping and Delivery",
        description: "Your order will be prepared and shipped quickly.",
    },
    {
        title: "Enjoy your products",
        description: "Receive your order and enjoy great quality.",
    },
];

const HowItWork = () => {
    return (
        <section className="mt-14 relative bg-linear-to-r lg:from-transparent from-black/30 lg:via-black/30 to-black/70">
            <div className=" py-12 w-[88%] lg:w-[70%] mx-auto ">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-[32px] font-poppins-semi-bold font-semibold text-white">
                            How It Works
                        </h1>
                        <p className="text-white text-xs font-poppins-regular font-normal text-center lg:w-[55%] leading-normal mx-auto">
                            With simple steps, explore, choose, and order your
                            products easily. From browsing to delivery, we
                            provide a smooth and fast shopping experience!
                        </p>
                    </div>

                    <div className="flex gap-4.5 h-87.5 ml-auto">
                        <div className="flex flex-col items-center justify-between relative h-full">
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                01
                            </div>
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                02
                            </div>
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                03
                            </div>
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                04
                            </div>
                            <div className="z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white text-tiny-black text-[16px] font-medium font-poppins-medium">
                                05
                            </div>
                            <div className="h-full w-0.5 bg-[#8C8C8C] rounded-[19px] absolute top-0 z-0" />
                        </div>
                        <div className="flex flex-col justify-between">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2"
                                >
                                    <h1 className="text-white text-sm font-semibold font-poppins-semi-bold">
                                        {step.title}
                                    </h1>
                                    <p className="text-white text-xs font-normal font-poppins-regular lg:w-[80%]">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Image
                src={"/images/howitwork-img.webp"}
                fill
                priority
                alt="how-it-work"
                className="hidden lg:block object-cover z-[-1]"
            />
            <Image
                src={"/images/sm-howitwork-img.webp"}
                fill
                priority
                alt="how-it-work"
                className="lg:hidden object-cover z-[-1]"
            />
        </section>
    );
};

export default HowItWork;
