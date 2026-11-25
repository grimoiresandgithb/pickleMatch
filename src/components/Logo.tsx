import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link href="/" aria-label="PickleMatch home">
            <Image 
                src="/images/logo.png"
                alt="PickleMatch"
                width={280}
                height={70}
                className="w-[190px] sm:w-[240px] h-auto"
                priority
            />
        </Link>
    );
}