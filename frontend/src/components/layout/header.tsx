"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const headerTabs = [
  { label: "Home", id: "home", path: "/" },
  { label: "Leaderboard", id: "leaderboard", path: "/leaderboard" },
  { label: "Analytics", id: "analytics", path: "/analytics" },
  { label: "Search", id: "search", path: "/search" },
];

/**
 * Integrate Dashboard Header Component Here And Create Only One Header Component
 * @returns 
 */
export default function Header() {
  const pathname = usePathname();
  const [mode, setMode] = useState(1);

  useEffect(() => {
    setMode(mode);
  }, [mode]);

  return (

    <header className="bg-background px-2 pt-2">
    <div className="w-full flex flex-col gap-4 px-2 pt-2">
      <div className="h-[34px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xs">
                <div className="relative">
                  <div className="h-3 w-3 animate-ping rounded-full bg-primary" />
                  <div className="absolute left-0 top-0 h-3 w-3 rounded-full bg-primary" />
                </div>
                <span className="truncate">
                Mode Activated : {mode === 1 ? "Redis Cache" : "Without Redis Cache"}
                </span>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <ModeToggle />
          </div>
        </div>
        <div className="flex gap-2">
          {headerTabs.map((tab) => (
            <div key={tab.id}>
              <Link 
                href={tab.path} 
                key={tab.id}
                className={`rounded px-3 py-2 text-sm hover:bg-muted ${
                  pathname === tab.path ? "text-primary" : ""
                }`}
              >
                {tab.label}
              </Link>
              <div className="mt-2 min-h-0.5">
                {pathname === tab.path && (
                  <div className="h-0.5 bg-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
} 
