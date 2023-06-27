import React from "react";
import { ToggleTheme } from "./ToggleTheme";
import Logo from "./Logo";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { navLinks } from "@/constants/nav-links";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center gap-6">
          <MobileMenu />
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm font-medium text-muted-foreground capitalize"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ToggleTheme />
          <Link href="/login" className={buttonVariants()}>
            get started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
