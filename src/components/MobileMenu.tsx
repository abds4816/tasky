import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navLinks } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const MobileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "flex md:hidden"
        )}
      >
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {navLinks.map((link, index) => (
          <DropdownMenuItem key={index}>
            <Link href={link.href} className="w-full capitalize">
              {link.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
