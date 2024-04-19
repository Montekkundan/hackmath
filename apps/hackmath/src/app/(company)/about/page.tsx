"use client"
import Head from 'next/head';
import React from 'react'
import { Hero } from './_components/hero';
import { Collaboration } from './_components/collaboration';
import { SamePage } from './_components/same-page';
import { StreamlinedExperience } from './_components/streamlined-experience';
import { Features } from './_components/features';
import { MoreFeatures } from './_components/more-features';
import { NoLockin } from './_components/no-lockin';

export default function Page() {
  return (
    <>
      <Head>
        <title>HackMath About</title>
        <meta
          name="description"
          content="HackMath About"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="bg-[#090909]">
        <Hero />
        <div className="relative z-10 w-full overflow-x-clip">
          <Collaboration />
          <SamePage />
          <StreamlinedExperience />
          <Features />
          <MoreFeatures />
          <NoLockin />
        </div>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-[radial-gradient(circle_farthest-side_at_calc(300px)_calc(300px),_var(--color-secondary)_0%,_transparent_100%)] md:hidden">
          {/* This is a very ugly way of adding such a message, will fix it later TODO */}
          <p className="px-10 text-center text-xl text-white">
            Sorry, I only made this page work on desktop. working on mobile version
          </p>
        </div>
      </main>
    </>
  );
}