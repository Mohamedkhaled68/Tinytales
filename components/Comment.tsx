import Rating from "./Rating";

const Comment = ({ rating }: { rating: number }) => {
    return (
        <div className="flex flex-col gap-2 border-b-2 border-[#F4F7F9] pb-5">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h1 className="font-poppins-semi-bold font-semibold text-sm text-tiny-black">
                        Alex Daewn
                    </h1>
                    <Rating rating={rating} />
                </div>
                <span className="text-[10px] text-tiny-black-200 font-medium font-poppins-medium">
                    4 months ago
                </span>
            </div>
            <p className="text-xs text-tiny-black-300 font-medium font-poppins-medium">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit,
            </p>
        </div>
    );
};

export default Comment;
