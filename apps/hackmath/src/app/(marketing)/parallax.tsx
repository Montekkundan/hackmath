"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import React from "react";


export function HeroParallaxHome() {
  return (
    <div className=""><HeroParallax products={products} />;</div>
  )
  
}
export const products = [
  {
    title: "Learn",
    link: "/learn",
    thumbnail:
      "/product/learn.png",
  },
  {
    title: "Chat",
    link: "/chat",
    thumbnail:
      "/product/drham.png",
  },
  {
    title: "leaderboard",
    link: "/leaderboard",
    thumbnail:
      "/product/warmup.png",
  },

  {
    title: "Quests",
    link: "/quests",
    thumbnail:
      "/product/analytics.png",
  },
  {
    title: "Shop",
    link: "/shop",
    thumbnail:
      "/product/drham2.png",
  },
  // -----------------------------------------

  {
    title: "leaderboard",
    link: "/leaderboard",
    thumbnail:
      "/product/application.png",
  },
  {
    title: "Learn",
    link: "/learn",
    thumbnail:
      "/product/learn.png",
  },
  {
    title: "Quests",
    link: "/quests",
    thumbnail:
      "/product/analytics.png",
  },
  {
    title: "Shop",
    link: "/shop",
    thumbnail:
      "/product/lesson.png",
  },
  {
    title: "Chat",
    link: "/chat",
    thumbnail:
      "/product/drham.png",
  },
    // -----------------------------------------

  {
    title: "leaderboard",
    link: "/leaderboard",
    thumbnail:
      "/product/application.png",
  },
  {
    title: "Shop",
    link: "/shop",
    thumbnail:
      "/product/lesson.png",
  },
  {
    title: "Quests",
    link: "/quests",
    thumbnail:
      "/product/analytics.png",
  },
  {
    title: "Chat",
    link: "/chat",
    thumbnail:
      "/product/drham2.png",
  },
  {
    title: "Learn",
    link: "/learn",
    thumbnail:
      "/product/learn.png",
  },
];
