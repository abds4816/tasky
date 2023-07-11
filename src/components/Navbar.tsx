import React, { FC } from "react";
import { ToggleTheme } from "./ToggleTheme";
import Logo from "./Logo";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/lib/session";
import { INavLink } from "@/types/intefaces";

interface NavbarProps {
  items: INavLink[];
}

const Navbar: FC<NavbarProps> = async ({ items }) => {
  const user = await getCurrentUser();

  return (
    <header className="border-b">
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-4">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium text-muted-foreground capitalize"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ToggleTheme />
          {!user ? (
            <Link
              href="/login"
              className={cn(buttonVariants(), "hidden md:flex")}
            >
              get started
            </Link>
          ) : (
            <UserMenu user={user} />
          )}
          <MobileMenu items={items} user={user} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
