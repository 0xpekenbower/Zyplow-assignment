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
      <PageTitle 
        title="Leaderboard" 
        description="See how you rank among other developers"
      />
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
                <SelectItem value="Morocco">Morocco</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Spain">Spain</SelectItem>
                <SelectItem value="Italy">Italy</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="Portugal">Portugal</SelectItem>
                <SelectItem value="Brazil">Brazil</SelectItem>
              </SelectContent>
            </Select>
          </TabsList>
        </Tabs>
        <div className="flex justify-center pt-24 w-full h-full">
          <GetLeaderboard location={location} sort={sort} />
        </div>
      </PageContent>
    </>
  );
} 