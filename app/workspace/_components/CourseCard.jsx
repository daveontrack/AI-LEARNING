import { Button } from "@/components/ui/button";
import axios from "axios";
import { Book, LoaderCircle, PlayCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

function CourseCard({ course }) {
  const courseJson = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/enroll-course", {
        cid: course?.cid,
      });
      console.log(result.data);
      if (result.data.resp) {
        toast.warning("Already Enrolled!");
        setLoading(false);
        return;
      }
      toast.success("Enrolled!");
      setLoading(false);
    } catch (e) {
      toast.error("server side error");
      setLoading(false);
    }
  };

  return (
    <div className="shadow rounded-2xl">
      
       <Image src={course?.bannerImageUrl}
        alt={course?.name}
        width={400}
        height={300}
        className="w-full aspect-video rounded-xl object-cover"
      />
      <div className="p-3 flex flex-col gap-3">
        <h2 className="font-bold text-lg">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-gray-500 text-sm">
          {courseJson?.description}
        </p>
        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-2 text-sm">
            <Book className="text-primary h-5 w-5" />
            {courseJson?.noOfChapters} chapters
          </h2>
          {course?.courseContent?.length ? (
            <Button size={"sm"} onClick={onEnrollCourse} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <PlayCircle />
              )}
              Enroll Course
            </Button>
          ) : (
            <Link href={"/workspace/edit-course/" + course?.cid}>
              <Button size={"sm"} variant="outline">
                <Settings /> Generate Course
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
