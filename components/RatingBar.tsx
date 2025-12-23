import { GiRoundStar } from "react-icons/gi";

interface RatingBarProps {
    rating?: string;
    percentage?: string;
}

const RatingBar = ({ rating, percentage }: RatingBarProps) => {
    return (
        <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2">
                <GiRoundStar size={24} className="text-tiny-pink" />
                <span className="text-tiny-black-300 font-medium font-poppins-medium text-xl">
                    {rating}
                </span>
            </div>

            <div className="w-full bg-tiny-black-50 rounded-xl h-1.5 ">
                <div
                    style={{ width: `${percentage}%` }}
                    className={` bg-tiny-pink rounded-xl h-full`}
                />
            </div>

            <span className="text-xl font-medium font-poppins-medium text-tiny-black-300">
                {percentage}%
            </span>
        </div>
    );
};

export default RatingBar;
