
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-center">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-inlustro-blue">404</h1>
        <h2 className="text-3xl font-semibold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
