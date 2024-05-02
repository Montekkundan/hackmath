import { HoverEffect } from "@/components/ui/card-hover-effect";


export function HoverCards() {
  return (
    <>
    <div className="max-w-5xl mx-auto px-8">
    <h1 className="text-3xl font-bold">For Students</h1>
      <HoverEffect items={student} />
    </div>
    <div className="max-w-5xl mx-auto px-8">
    <h1 className="text-3xl font-bold">For Teachers</h1>
      <HoverEffect items={teacher} />
    </div>
    </>
  );
}
export const student = [
  {
    description:
      "Don’t know where to starts math.",
  },
  {
    description:
      "Need better understanding on basic concepts",
  },
  {
    description:
      "Not sure which math to study to follow up with the class.",
  },
];

export const teacher = [
    {
      description:
        "Provide customized resources to students. ",
    },
    {
      description:
        "Identify students' weaknesses to provide the right resources.",
    },
    {
      description:
        "Help students stay on track with their course progress.",
    },
  ];
  
