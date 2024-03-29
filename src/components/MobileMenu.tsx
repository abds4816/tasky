"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { INavLink } from "@/types/intefaces";
import { FC, useState } from "react";
import { User } from "next-auth";

interface MobileMenuProps {
  items: INavLink[];
  user: User | null | undefined;
}

const MobileMenu: FC<MobileMenuProps> = ({ items, user }) => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  return (
    <Sheet open={showDrawer} onOpenChange={setShowDrawer}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "flex md:hidden"
        )}
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="w-full h-full grid place-content-center gap-6">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="w-full text-xl capitalize"
              onClick={() => setShowDrawer(false)}
            >
              {item.title}
            </Link>
          ))}
          {!user && (
            <Link
              href="/login"
              className={buttonVariants()}
              onClick={() => setShowDrawer(false)}
            >
              get started
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
