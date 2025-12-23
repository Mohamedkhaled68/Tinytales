import { GiRoundStar } from "react-icons/gi";

const Rating = ({ rating }: { rating: number }) => {
    return (
        <>
            <div className="flex items-center gap-1">
                {Array.from({ length: rating }, (_, i) => {
                    return (
                        <GiRoundStar
                            className="text-tiny-pink"
                            key={i}
                            size={16}
                        />
                    );
                })}
                {Array.from({ length: 5 - rating }, (_, i) => {
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
