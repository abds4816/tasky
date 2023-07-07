import Link from "next/link";
import React, { FC } from "react";
import { Icons } from "./Icons";

interface LogoProps {
  me?: string;
}

const Logo: FC<LogoProps> = ({ me }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 me-${me}`}>
      <Icons.logo className="w-6 h-6" />
      <h4 className="scroll-m-20 text-md font-semibold tracking-wide">Tasky</h4>
    </Link>
  );
};

export default Logo;
