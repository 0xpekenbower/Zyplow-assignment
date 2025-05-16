"use client";

import { ArrowRight, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Discover and track the best <span className="text-primary">GitHub</span> developers worldwide
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            GitHub+ helps you find, analyze, and connect with top developers around the world. 
            Track contributions, visualize activity, and discover talent with powerful analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/leaderboard">
              <Button size="lg" className="gap-2">
                Explore Leaderboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="gap-2">
                Search Developers <Search className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="w-full h-[350px] relative rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="w-full max-w-md bg-card/80 backdrop-blur-sm border rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-lg font-semibold">Developer Leaderboard</div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-background/50 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-muted" />
                        <div className="h-4 w-24 bg-muted rounded-md" />
                      </div>
                      <div className="h-4 w-16 bg-muted rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Start discovering top GitHub developers and gain valuable insights into the global developer community.
        </p>
        <Link href="/leaderboard">
          <Button size="lg" className="gap-2">
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}


