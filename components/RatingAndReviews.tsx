import Image from "next/image";
import RatingBar from "./RatingBar";

const RatingAndReviews = () => {
    return (
        <>
            <div className="flex flex-col gap-0.5">
                <div className="relative w-fit">
                    <h1 className="font-poppins-semi-bold font-semibold text-[16px] text-tiny-black">
                        Rating & Reviews
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

            <div className="flex flex-col items-center justify-center">
                <div className="mt-5">
                    <span className="text-[80px] font-medium font-poppins-medium text-tiny-black">
                        4,5
                    </span>
                    <span className="text-2xl font-medium font-poppins-medium text-tiny-black-100">
                        /5
                    </span>
                </div>

                <div className="flex flex-col gap-2 w-full mt-2">
                    <RatingBar rating={"5"} percentage={"67"} />
                    <RatingBar rating={"4"} percentage={"15"} />
                    <RatingBar rating={"3"} percentage={"6"} />
                    <RatingBar rating={"2"} percentage={"3"} />
                    <RatingBar rating={"1"} percentage={"9"} />
                </div>
            </div>
        </>
    );
};

export default RatingAndReviews;
