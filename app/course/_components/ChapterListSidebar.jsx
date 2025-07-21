import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

function ChapterListSidebar({ courseInfo }) {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );
  let completedChapter = enrollCourse?.completedChapter ?? [];
  return (
    <div className="w-80 bg-secondary h-screen p-5">
      <h2 className="my-3 font-bold text-xl">
        Chapters({courseContent?.length})
      </h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => {
          <AccordionItem value={chapter?.courseData?.chapterName} key={index}>
            onClick={() => setSelectedChapterIndex(index)}
            <AccordionTrigger
              className={`text-lg font-medium ${
                completedChapter.includes(index)
                  ? "bg-green-50 text-green-600"
                  : " text-white"
              }`}
            >
              {index + 1} {chapter?.courseData?.chapterName}
            </AccordionTrigger>
            <AccordionContent as Child>
              <div className="p-4">
                {chapter?.courseData?.topics.map((topic, index_) => (
                  <h2
                    key={index}
                    className={`p-3  bg-white
                  ${
                    completedChapter.includes(index)
                      ? "bg-green-50 text-green-600"
                      : " text-white"
                  }`}
                  >
                    {topic?.topic}
                  </h2>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>;
        })}
      </Accordion>
    </div>
  );
}

export default ChapterListSidebar;
//daveontrack
