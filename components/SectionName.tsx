import Image from "next/image";

const SectionName = ({ secName }: { secName: string }) => {
    return (
        <div className="relative h-33.5 w-full bg-[#F5F5F5] overflow-hidden">
            <Image
                src={"/images/bg-ver.webp"}
                alt="Background"
                fill
                priority
                className="opacity-5"
                style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
                <h1 className="outlined-text text-[32px] font-poppins-bold opacity-5 font-bold">
                    {secName}
                </h1>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
                <h1 className="text-tiny-black text-[20px] font-poppins-semi-bold">
                    {secName}
                </h1>
            </div>
        </div>
    );
};

export default SectionName;
