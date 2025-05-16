import LandingTitle from "@/components/landing/title";
import CacheOptionsSection from "@/components/CacheOptionsSection";

export default function HomePage() {
  return (
    <div className="flex justify-center pt-24">
      <div className="flex flex-col items-center">
        <LandingTitle />
        <div className="p-2 text-center text-sm text-muted-foreground">
          Tracking GitHub Users Activity And Visualizing It
        </div>
        <CacheOptionsSection />
      </div>
    </div>
  );
} 