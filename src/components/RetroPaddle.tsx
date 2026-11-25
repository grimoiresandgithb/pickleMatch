import Image from "next/image";

export default function RetroPaddle() {
    return (
        <Image
            src="/images/paddles.png"
            alt=""
            width={600}
            height={600}
            className="w-full max-w-[460px] h-auto"
            priority
        />
    );
}