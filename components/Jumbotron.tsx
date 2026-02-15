import Image from "next/image";

export default function Jumbotron(isShown: boolean) {
  return (
    <div
      className={
        isShown
          ? `flex justify-around items-center h-[100vh] text-black`
          : `hidden`
      }
    >
      <div className="text-main1">
        <span className="md:text-3xl min-[576px]:text-2xl text-xl font-semibold">
          Visualize your ideas
        </span>
        <p className="md:text-xl min-[576px]:text-lg text-base min-[576px]:mt-2 mt-1">
          One step closer to our dream!
        </p>
        <button className="normal-btn">Who am I?</button>
      </div>
      <Image
        className="md:w-[300px] min-[576px]:w-[250px] w-[200px]"
        src="/images/logo/nobg/sm-logo-nobg.png"
        alt="logo"
        width={100}
        height={100}
      />
    </div>
  );
}
