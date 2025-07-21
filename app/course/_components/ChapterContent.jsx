import { Button } from "@/components/ui/button";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import axios from "axios";
import { CheckCircle, Cross, Loader2Icon, Youtube } from "lucide-react";
import { useParams } from "next/navigation";
import React, { use, useContext, useState } from "react";
import { toast } from "sonner";

function ChapterContent({ courseInfo, refreshData }) {
  const { cid } = useParams();
  const { course, enrollCourse } = courseInfo;
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );
  const videoData = courseContent?.[selectedChapterIndex]?.Youtubevideo;
  const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;
  let completedChapter = enrollCourse?.completedChapter ?? [];
  const [loading, setLoading] = useState(false);

  const markChapterCompleted = async () => {
    setLoading(true);
    completedChapter.push(selectedChapterIndex);
    const result = await axios.put("/api/enroll-course", {
      cid: cid,
      completedChapter: completedChapter,
    });
    console.log(result);
    refreshData();
    toast.success("chapter marked completed!");
    setLoading(false);
  };
  const markInCompleteChapter = async () => {
    setLoading(false);
    const result = await axios.put("/api/enroll-course", {
      cid: cid,
      completedChapter: completedChap,
    });
    console.log(result);
    refreshData();
    toast.success("chapter marked incompleted!");
    setLoading(false);
  };
  return (
    <div className="p-10 ml-80 mt-20">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          {selectedChapterIndex + 1}.
          {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
        </h2>
        {!completedChapter?.includes(selectedChapterIndex) ? (
          <Button onClick={() => markChapterCompleted()} disabled={loading}>
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <CheckCircle />
            )}
            Mark as Completed
          </Button>
        ) : (
          <button variant="outline" onClick={markInCompleteChapter}>
            disabled={loading}
            {loading ? <Loader2Icon className="animate-spin" /> : <X />} Mark
            incomplete
          </button>
        )}
      </div>

      <h2 className="my-3 font-bold text-lg">Related Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videoData?.map(
          (video, index) =>
            index < 2 && (
              <div key={index}>
                <Youtube
                  videoId={video?.videoId}
                  opts={{
                    height: "250",
                    width: "450",
                  }}
                />
              </div>
            )
        )}
      </div>
      <div className="mt-5">
        {topics.map((topic, index) => {
          <div className="mt-10 p-5 bg-secondary rounded-2xl">
            <h2 className="font-bold text-2xl text-primary">
              {index + 1}.{topic?.topic}
            </h2>
            {/* <p>{topic?.content}</p> */}
            <div dangerouslySetInnerHTML={{ __html: topic?.content }}>
              style=
              {{
                lineheight: "2.5",
              }}
            </div>
          </div>;
        })}
      </div>
    </div>
  );
}

export default ChapterContent;
