import { buttonVariants } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { ArrowLeft, FileX2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <EmptyState className="border-none">
      <EmptyStateContent>
        <EmptyStateIcon>
          <FileX2 className="w-10 h-10" />
        </EmptyStateIcon>
        <EmptyStateTitle>Uh oh! Not Found</EmptyStateTitle>
        <EmptyStateDescription>
          This project cound not be found. Please try again.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Link
            href="/projects"
            className={buttonVariants({ variant: "ghost", size: "lg" })}
          >
            <ArrowLeft className="w-4 h-4" />
            back to projects
          </Link>
        </EmptyStateActions>
      </EmptyStateContent>
    </EmptyState>
  );
}
