import Link from "next/dist/client/link";
import Image from "next/image";

interface JumbotronProps {
  isShown: boolean;
}

export default function Jumbotron({ isShown }: JumbotronProps) {
  return (
    <div
      className={
        isShown
          ? "flex justify-around items-center h-[100vh] text-black"
          : "hidden"
      }
    >
      <div>
        <span className="md:text-3xl sm:text-2xl text-xl font-semibold">
          Visualize your ideas
        </span>
        <p className="md:text-xl sm:text-lg text-base sm:mt-2 mt-1">
          One step closer to our dream!
        </p>
        <Link href="/about" className="main-btn">
          Who am I?
        </Link>
      </div>
      <Image
        className="md:w-[300px] sm:w-[200px] w-[100px]"
        src="/images/logo/nobg/sm-logo-nobg.png"
        alt="logo"
        width={100}
        height={100}
      />
    </div>
  );
}
