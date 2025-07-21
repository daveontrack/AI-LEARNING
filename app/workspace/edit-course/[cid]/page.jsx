"use client";
import axios from "axios"; // ✅ correct
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import CourseInfo from "../_components/CourseInfo";
import ChapterTopicList from "../_components/ChapterTopicList";

function EditCourse({ ViewCourse = false }) {
  const { cid } = useParams();
  const [loading, setloading] = useState(false);
  const [course, setCourse] = useState();
  //console.log(cid);

  useEffect(() => {
    GetCourseInfo();
  }, []);

  const GetCourseInfo = async () => {
    setloading(true);
    const result = await axios.get("/api/courses?cid=" + cid);
    console.log(result.data);
    setloading(false);
    setCourse(result.data);
  };
  return (
    <div>
      <CourseInfo course={course} ViewCourse={ViewCourse} />
      <ChapterTopicList course={course} />
    </div>
  );
}

export default EditCourse;
