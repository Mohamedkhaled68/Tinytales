import { TailSpin } from "react-loader-spinner";

const Loading = ({ width, height }: { width: string; height: string }) => {
    return (
        <TailSpin
            visible={true}
            height={height || "50"}
            width={width || "50"}
            color="#8a8a8a"
            ariaLabel="tail-spin-loading"
            radius="1"
        />
    );
};

export default Loading;
