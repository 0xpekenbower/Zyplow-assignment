'use client'

import { GetLeaderboard } from "@/components/dashboard/leaderboard/leaderboard"
import { PageContent, PageTitle } from "@/components/page-title-content"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
export default function Leaderboard() {
  const [location, setLocation] = useState("Morocco")
  const [sort, setSort] = useState("followers")
  return (
    <>
      <PageContent>
        <Tabs defaultValue="Followers" className="w-full">
          <TabsList>
            <TabsTrigger value="Followers" onClick={() => setSort("followers")}>Followers</TabsTrigger>
            <TabsTrigger value="Repositories" onClick={() => setSort("repositories")}>Repositories</TabsTrigger>
            <Select defaultValue="Morocco" onValueChange={(value) => setLocation(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {["Morocco", "USA", "France", "Spain", "Italy", "Germany", "Brazil", "Canada", "India", "China", "Japan"].map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TabsList>
        </Tabs>
        <PageTitle 
          title="Leaderboard" 
          description="See how you rank among other developers"
        />
        <div className="flex justify-center pt-24 w-full h-full">
          <GetLeaderboard location={location} sort={sort} />
        </div>
      </PageContent>
    </>
  );
} 