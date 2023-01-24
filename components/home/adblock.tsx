import Image from "next/image";

export default function AdBlock() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/cat2.png"
        alt="Cat Cooking"
        className="relative object-contain p-5 h-full w-full"
        width={1024}
        height={1024}
      />
    </div>
  );
}
