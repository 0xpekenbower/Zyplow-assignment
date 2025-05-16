"use client";

import { useEffect, useState } from "react";
import { useMetricsStore } from "@/lib/store/metrics";
import { getRedisMemoryInfo } from "@/lib/redis-client";
import { Badge } from "@/components/ui/badge";
import { Database, GitPullRequest } from "lucide-react";

export function ApiMetrics() {
  const { apiRequests, rateLimit } = useMetricsStore();
  const [formattedRedisSize, setFormattedRedisSize] = useState<string>("0 KB");
  
  // Format bytes to human-readable format
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  
  // Fetch Redis memory info
  useEffect(() => {
    const fetchRedisInfo = async () => {
      const size = await getRedisMemoryInfo();
      if (size !== null) {
        setFormattedRedisSize(formatBytes(size));
      }
    };
    
    fetchRedisInfo();
    
    // Set up interval to refresh Redis size every 30 seconds
    const interval = setInterval(fetchRedisInfo, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
        <GitPullRequest className="h-3 w-3" />
        <span className="text-xs font-medium">
          {apiRequests}/{rateLimit.limit} ({rateLimit.remaining} left)
        </span>
      </Badge>
      
      <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
        <Database className="h-3 w-3" />
        <span className="text-xs font-medium">{formattedRedisSize}</span>
      </Badge>
    </div>
  );
}
