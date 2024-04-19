"use client"
import Image from "next/image";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from 'next/dynamic'
const MediaQuery = dynamic(() => import('react-responsive'), {
  ssr: false
})
import { HeroParallaxHome } from "./parallax";
import { HeroTabs } from "./hero-tabs";

export default function Home() {

  return (
    <>
      <div className="max-w-[988px] py-40 mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
        <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
          <Image src="/hero.png" fill alt="Hero" />
        </div>
        <div className="flex flex-col items-center gap-y-8">
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
            Learn, practice, and master Math with HackMath.
          </h1>
          <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">

            <Button size="lg" variant="secondary" className="w-full">
              <Link href="/learn">
                Get Started
              </Link>
            </Button>

            <Button size="lg" variant="primaryOutline" className="w-full">
              I already have an account
            </Button>

            {/* <Button size="lg" variant="secondary" className="w-full" asChild>
              <Link href="/learn">
                Continue Learning
              </Link>
            </Button> */}

          </div>
        </div>
      </div>

      <MediaQuery minDeviceWidth={1224}>
        {(matches) => matches && <HeroParallaxHome />}
      </MediaQuery>

      <HeroTabs />
    </>
  )
}