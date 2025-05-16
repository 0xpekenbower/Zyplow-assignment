import LandingLayout from "@/components/layout/landing-layout";
import LandingTitle from "@/components/landing/title";
import AuthOptions from "@/components/AuthOptions";

export default function HomePage() {
  return (
    <LandingLayout>
      <div className="flex justify-center pt-24">
        <div className="flex flex-col items-center">
          <LandingTitle />
          <div className="p-2 text-center text-sm text-muted-foreground">
            Tracking GitHub Users Activity And Visualizing It
          </div>
        </div>
      </div>
      <AuthOptions />
    </LandingLayout>
  );
} 