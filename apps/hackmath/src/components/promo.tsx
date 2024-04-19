import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Promo = () => {
  return (
    <div className="border-2 border-foreground rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <h3 className="font-bold text-lg">
            Join HackMath +
          </h3>
        </div>
        <p className="text-muted-foreground">
          Get unlimited hearts and more!
        </p>
      </div>
      <Button
        asChild
        variant="secondary"
        className="w-full"
        size="lg"
      >
        <Link href="/shop">
          Upgrade today
        </Link>
      </Button>
    </div>
  );
};