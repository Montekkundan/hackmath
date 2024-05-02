"use client";

import { ImageTabs } from "@/components/ui/image-tabs";

import Image from "next/image";


export function HeroTabs() {
  const tabs = [
    {
      title: "Learn",
      value: "learn",
      subheading: "The AI continually analyzes their performance and learning gaps as the student progresses through the lessons. This ongoing analysis allows the AI to adjust the curriculum dynamically, ensuring that the student is constantly challenged just enough to learn effectively without feeling overwhelmed.",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#457B9D] to-[#1D3557]">
          <p>Learn Page</p>
          <Content image="/product/learn.png"  />
        </div>
      ),
    },
    {
      title: "Chat",
      value: "chat",
      subheading: "The AI tutor, named Dr. Ham, engages students through interactive lessons that make learning Math fun and engaging. This interactive component keeps students motivated and enhances their learning experience.",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#457B9D] to-[#1D3557]">
          <p className="mb-6">Personal Chatbot</p>
          <Content image="/product/drham2.png" />
        </div>
      ),
    },
    {
      title: "Analytics",
      value: "analytics",
      subheading: "HackMath includes an analytics tab that provides feedback on the student's progress. This feature allows students(and potentially their teachers or parents) to see tangible proof of improvement and areas that need more attention.",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#457B9D] to-[#1D3557]">
          <p>Analytics</p>
          <Content image="/product/analytics.png"  />
        </div>
      ),
    },
    {
      title: "Lessons",
      value: "lessons",
      subheading: "Based on the results of the assessment quiz, the AI customizes the learning content to match the student's specific needs. This means the lesson plan is not one-size-fits-all; it adapts to the student's learning pace and understanding.",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#457B9D] to-[#1D3557]">
          <p>Interactive Lessons</p>
          <Content image="/product/lesson.png"  />
        </div>
      ),
    },
    {
      title: "Application",
      value: "application",
      subheading: "The AI Customized Learning in HackMath is divided into three categories: Conceptual: Understanding the underlying concepts of Math topics. Procedural: Learning how to apply these concepts through mathematical procedures or steps. Application: Applying learned concepts and procedures to solve real-world problems.",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#457B9D] to-[#1D3557]">
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
