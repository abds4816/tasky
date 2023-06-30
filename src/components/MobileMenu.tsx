import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "flex md:hidden"
        )}
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="w-full h-full grid place-content-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="w-full text-2xl capitalize"
            >
              {link.title}
            </Link>
          ))}
          <Link href="/login" className={buttonVariants()}>
            get started
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
