import { GiRoundStar } from "react-icons/gi";

const Rating = ({ rating }: { rating: string }) => {
    const roundedRating = Math.round(Number(rating));

    return (
        <>
            <div className="flex items-center gap-1">
                {Array.from({ length: roundedRating }, (_, i) => {
                    return (
                        <GiRoundStar
                            className="text-tiny-pink"
                            key={i}
                            size={16}
                        />
                    );
                })}
                {Array.from({ length: 5 - roundedRating }, (_, i) => {
                    return (
                        <GiRoundStar
                            className="text-tiny-pink/50"
                            key={i}
                            size={16}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Rating;
