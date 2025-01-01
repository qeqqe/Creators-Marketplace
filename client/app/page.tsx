import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Zap, Shield } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center sm:px-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Empower Your Creativity
        </h1>
        <p className="mt-3 text-xl sm:text-2xl max-w-2xl text-muted-foreground">
          Join the ultimate marketplace where creators thrive and buyers
          discover unique digital content.
        </p>
        <div className="flex flex-col sm:flex-row mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/marketplace">
              Explore Marketplace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/signup">Become a Creator</Link>
          </Button>
        </div>

        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          <FeatureCard
            icon={<Star className="h-10 w-10 text-yellow-400" />}
            title="Diverse Content"
            description="Explore a wide range of high-quality digital content from talented creators worldwide."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-green-500" />}
            title="Secure Transactions"
            description="Buy and sell with confidence using our secure and transparent payment system."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-blue-500" />}
            title="Powerful Tools"
            description="Access cutting-edge tools to showcase, manage, and grow your digital content business."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border border-border rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
