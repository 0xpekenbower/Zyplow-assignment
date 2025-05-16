import { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export function PageContent({ children, className = "" }: PageContentProps) {
  return (
    <div className={`m-auto w-full max-w-6xl px-6 ${className}`}>
      {children}
    </div>
  );
} 