"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
export default function Header() {
  return (
    <header className="px-4 py-3 border-b flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-lg font-bold">
            {/* NAME: <GitHub+/> */}
            <span className="text-primary">{`<GitHub+>`}</span>
            {/* <span className="text-muted-foreground">+</span> */}
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {/* <LanguageSelect /> (Not Needed) */}
        <ModeToggle />
      </div>
    </header>
  );
} 