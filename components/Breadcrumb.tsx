import { FaAngleRight } from "react-icons/fa6";

const Breadcrumb = () => {
    return (
        <nav className="w-full rounded-2xl bg-[#ECECEC66] p-4">
            <ol className="flex items-center flex-wrap gap-2">
                <li className="flex items-center gap-0.5">
                    <span className="font-poppins-medium font-medium text-tiny-black text-xs hover:underline">
                        Home
                    </span>
                    <FaAngleRight size={24} className="text-tiny-black" />
                </li>

                <li className="flex items-center gap-0.5">
                    <span className="font-poppins-medium font-medium text-tiny-black text-xs hover:underline">
                        Our Category
                    </span>
                    <FaAngleRight size={24} className="text-tiny-black" />
                </li>

                <li className="font-medium text-tiny-black-200">T-Shirt</li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
