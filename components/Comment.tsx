import { RateItem } from "@/hooks/useGetProductById";
import Rating from "./Rating";

const Comment = ({ comment }: { comment: RateItem }) => {
    return (
        <div className="flex flex-col gap-2 border-b-2 border-[#F4F7F9] pb-5">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h1 className="font-poppins-semi-bold font-semibold text-sm text-tiny-black">
                        {comment.user_name}
                    </h1>
                    <Rating rating={comment.rate} />
                </div>
                <span className="text-[10px] text-tiny-black-200 font-medium font-poppins-medium">
                    {comment.diff_for_humans}
                </span>
            </div>
            <p className="text-xs text-tiny-black-300 font-medium font-poppins-medium">
                {comment.comment}
            </p>
        </div>
    );
};

export default Comment;
