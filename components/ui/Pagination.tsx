import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";

interface PaginationProps {
    links: {
        first?: string;
        last?: string;
    };
    meta: {
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    onPageChange: (page: string) => void;
}

const Pagination = ({ links, meta, onPageChange }: PaginationProps) => {
    return (
        <div
            className="p-4 w-full flex items-center justify-center gap-1.25 mt-10"
            dir="ltr"
        >
            <button
                onClick={() => {
                    if (links?.first) {
                        const pageNum = links.first.split("page=")[1];
                        onPageChange(pageNum);
                    }
                }}
                className="w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg p-2.5 font-semibold font-poppins-semi-bold border border-[#F1F1F1] text-tiny-black disabled:opacity-15 disabled:cursor-not-allowed"
                disabled={!links?.first}
            >
                <RiArrowLeftDoubleFill size={20} />
            </button>
            {meta?.links.map((link: any, index: number) => (
                <button
                    onClick={() => {
                        if (link.url) {
                            const pageNum = link.url.split("page=")[1];
                            onPageChange(pageNum);
                        }
                    }}
                    className={`w-8 h-8 flex justify-center items-center cursor-pointer ${
                        link.active
                            ? "border-[1.5px] border-tiny-pink text-tiny-pink"
                            : "border border-[#F1F1F1] text-tiny-black"
                    } disabled:opacity-15 disabled:cursor-not-allowed rounded-lg p-2.5 font-semibold font-poppins-semi-bold text-[13px]`}
                    key={index}
                    disabled={
                        (link.label.includes("Previous") && !link.url) ||
                        (link.label.includes("Next") && !link.url)
                    }
                >
                    {link.label.includes("Previous") ? (
                        <FaAngleLeft />
                    ) : link.label.includes("Next") ? (
                        <FaAngleRight />
                    ) : (
                        link.label
                    )}
                </button>
            ))}
            <button
                onClick={() => {
                    if (links?.last) {
                        const pageNum = links.last.split("page=")[1];
                        onPageChange(pageNum);
                    }
                }}
                className="w-8 h-8 flex justify-center items-center cursor-pointer rounded-lg p-2.5 font-semibold font-poppins-semi-bold border border-[#F1F1F1] text-tiny-black disabled:opacity-15 disabled:cursor-not-allowed"
                disabled={!links?.last}
            >
                <RiArrowRightDoubleFill size={20} />
            </button>
        </div>
    );
};

export default Pagination;
