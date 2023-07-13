import { FC, ReactNode } from "react";

interface PageHeaderProps {
  title: string | undefined;
  description?: string | null | undefined;
  children?: ReactNode;
}

const PageHeader: FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <section className="flex justify-between items-center flex-wrap gap-4">
      <div className="flex flex-col gap-2 max-w-[28rem]">
        <h3 className="text-3xl font-bold tracking-tight capitalize">
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
};

export default PageHeader;
