"use client";

// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MemoryStick, Clock, Database, Code, BarChart, FileJson, Wifi, LineChart, Users, UserCircle } from "lucide-react";

// TODO: More Description Content (0 Creative Ideas) (No Auth : Options Are With Redis Cache & Without Redis Cache)
const CacheOptions = [
  {
    name: "Redis Cache",
    description: "You Experience Using Redis Cache",
    icon: <MemoryStick className="h-8 w-8 text-primary" />,
    features: [
      { text: "All Features", icon: <Check className="h-5 w-5" /> },
      { text: "Unlimited Data Retention", icon: <Database className="h-5 w-5" /> },
      { text: "Multiple editor integrations", icon: <Code className="h-5 w-5" /> },
      { text: "Advanced analytics", icon: <BarChart className="h-5 w-5" /> },
      { text: "Export data to CSV/JSON", icon: <FileJson className="h-5 w-5" /> },
      { text: "5000 API Requests Per Hour", icon: <Wifi className="h-5 w-5" /> },
      { text: "Unlimited Visualizations", icon: <LineChart className="h-5 w-5" /> },
      { text: "Compare With Other Users", icon: <Users className="h-5 w-5" /> },
      { text: "User Profile", icon: <UserCircle className="h-5 w-5" /> },
    ],
    buttonText: "Enable Redis Cache",
    buttonVariant: "default" as const,
    highlighted: true,
  },
  {
    name: "Without Redis Cache",
    description: "You Experience Without Using Redis Cache",
    icon: <MemoryStick className="h-8 w-8 text-muted-foreground" />,
    features: [
      { text: "Leaderboard for 3 Countries", icon: <Users className="h-5 w-5" /> },
      { text: "Less Data Retention", icon: <Clock className="h-5 w-5" /> },
      { text: "No Details About User Repositories", icon: <Database className="h-5 w-5" /> },
      { text: "Limited API Requests", icon: <Wifi className="h-5 w-5" /> },
      { text: "Limited Visualizations", icon: <LineChart className="h-5 w-5" /> },
      { text: "No Comparison With Other Users", icon: <Users className="h-5 w-5" /> },
      { text: "No User Profile", icon: <UserCircle className="h-5 w-5" /> }
    ],
    buttonText: "Disable Redis Cache",
    buttonVariant: "outline" as const,
    highlighted: false,
  },
];

/**
 * This component is used to display the login options
 */
export default function CacheOptionsSection() {
  return (
    // <div className="py-20 w-full bg-gradient-to-b from-background to-muted/30">
    <div className="py-20 w-full bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Choose Your Experience</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Move Between Options To Get The See Difference Between Them
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {CacheOptions.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col transition-all duration-300 hover:shadow-xl ${
                plan.highlighted 
                  ? "border-primary shadow-md bg-primary/5" 
                  : "hover:border-muted-foreground/30"
              }`}
            >
              <CardHeader className={`${plan.highlighted ? "pb-2" : ""} flex flex-row items-center gap-4`}>
                <div className="p-2 rounded-full bg-muted/50">
                  {plan.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      <span className={`${plan.highlighted ? "text-primary" : "text-muted-foreground"}`}>
                        {feature.icon}
                      </span>
                      <span className="text-sm">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 