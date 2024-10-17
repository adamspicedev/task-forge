import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-xl font-bold">
      <Image src="/logo.svg" alt="logo" width={40} height={40} /> TaskForge
    </div>
  );
}
