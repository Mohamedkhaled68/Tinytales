import Image from "next/image";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
    return (
        <nav className="w-full p-5 shadow-[0px_0px_52px_-24px_#00000040]">
            <div className="container mx-auto flex justify-between items-center">
                <Image
                    src="/images/logo.svg"
                    alt="Tinytales Logo"
                    width={45}
                    height={35}
                    loading="eager"
                />
                <IoMenu size={24} />
            </div>
        </nav>
    );
};

export default Navbar;
