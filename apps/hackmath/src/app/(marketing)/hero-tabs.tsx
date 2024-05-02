"use client";

import { ImageTabs } from "@/components/ui/image-tabs";
import Image from "next/image";


export function HeroTabs() {
  const tabs = [
    {
      title: "Learn",
      value: "learn",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
          <p>Learn Page</p>
          <Content image="/product/learn.png"  />
        </div>
      ),
    },
    {
      title: "Chat",
      value: "chat",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
          <p>Personal Chatbot</p>
          <Content image="/product/drham2.png" />
        </div>
      ),
    },
    {
      title: "Analytics",
      value: "analytics",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
          <p>Analytics</p>
          <Content image="/product/analytics.png"  />
        </div>
      ),
    },
    {
      title: "Lessons",
      value: "lessons",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
          <p>Interactive Lessons</p>
          <Content image="/product/lesson.png"  />
        </div>
      ),
    },
    {
      title: "Application",
      value: "application",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
          <p>Application</p>
          <Content image="/product/application.png"  />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-center md:items-start justify-start mt-10 mb-40 md:my-40">
      <h2 className="text-2xl  md:text-7xl p-2 pb-8 font-bold text-black dark:text-white">HackMath</h2>
      <ImageTabs tabs={tabs} />
    </div>
  );
}
interface ContentProps {
  image?: string;
}
const Content = ({image}: ContentProps) => {
  return (
    <Image
      src={image || "/product/learn.png"}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
