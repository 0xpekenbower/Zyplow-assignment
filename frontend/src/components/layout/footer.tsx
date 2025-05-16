export default function Footer() {
  return (
    <footer className="mt-auto bg-background pb-8 pt-8 text-center">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-center text-sm text-muted-foreground">
          <div className="flex items-center gap-5">
            <div className="bg-muted h-[1px] w-16" />
            <div>
              Demo Version
            </div>
            <div className="bg-muted h-[1px] w-16" />
          </div>
        </div>
      </div>
    </footer>
  );
} 