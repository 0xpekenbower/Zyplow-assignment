import { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  description?: string;
  loading?: boolean;
}
interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export function PageTitle({ title, description, loading = false }: PageTitleProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-1 px-6 py-4">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 px-6 py-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
} 



export function PageContent({ children, className = "" }: PageContentProps) {
  return (
    <div className={`m-auto w-full max-w-6xl px-6 ${className}`}>
      {children}
    </div>
  );
} 