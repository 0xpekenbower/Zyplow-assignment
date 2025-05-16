"use client";

// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from './ui/button';

// TODO: More Description Content (0 Creative Ideas) (No Auth : Options Are With Redis Cache & Without Redis Cache)

/**
 * This component is used to display the login options
 */
export default function CacheOptionsSection() {
  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Caching Strategies Demo</CardTitle>
          <CardDescription>
            Try out different caching strategies for GitHub API data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">No Cache</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Data is fetched directly from the GitHub API each time without caching.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">LocalStorage Cache</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Data is cached in the browser&apos;s localStorage for faster access.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Redis Cache</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Data is cached in Redis server for persistence across sessions.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-6">
            <Link href="/cache-demo">
              <Button>
                Try Cache Demo
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 