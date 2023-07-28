import { buttonVariants } from "@/components/ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <EmptyState className="border-none">
      <EmptyStateContent>
        <EmptyStateIcon>
          <Users className="w-10 h-10" />
        </EmptyStateIcon>
        <EmptyStateTitle>Uh oh! Not Found</EmptyStateTitle>
        <EmptyStateDescription>
          This team cound not be found. Please try again.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Link
            href="/teams"
            className={buttonVariants({ variant: "ghost", size: "lg" })}
          >
            <ArrowLeft className="w-4 h-4" />
            back to teams
          </Link>
        </EmptyStateActions>
      </EmptyStateContent>
    </EmptyState>
  );
}
