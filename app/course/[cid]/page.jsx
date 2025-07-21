// import AppHeader from "@/app/workspace/_components/AppHeader";
// import React, { useEffect, useState } from "react";
// import ChapterListSidebar from "../_components/ChapterListSidebar";
// import ChapterContent from "../_components/ChapterContent";
// import { useParams } from "next/navigation";

// function Course() {
//   const { cid } = useParams();
//   const [courseInfo, setCourseInfo] = useState();
//   useEffect(() => {
//     GetEnrolledCourseById();
//   }, []);
//   const GetEnrolledCourseById = async () => {
//     const result = await axios.get("api/enroll-course?cid=" + cid);
//     console.log(result.data);
//     setCourseInfo(result.data);
//   };
//   return (
//     <div>
//       <AppHeader hideSidebar={true} />
//       <div className="flex gap-13">
//         <ChapterListSidebar />
//         <ChapterContent />
//       </div>
//     </div>
//   );
// }

// export default Course;
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import AppHeader from "@/app/workspace/_components/AppHeader";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import ChapterContent from "../_components/ChapterContent";
import { useParams } from "next/navigation";

function Course() {
  const { cid } = useParams();
  const [courseInfo, setCourseInfo] = useState(null);

  useEffect(() => {
    if (cid) {
      GetEnrolledCourseById();
    }
  }, [cid]);

  const GetEnrolledCourseById = async () => {
    try {
      const result = await axios.get("/api/enroll-course?cid=" + cid);
      console.log(result.data);
      setCourseInfo(result.data);
    } catch (error) {
      console.error("Failed to fetch course info:", error);
    }
  };

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className="flex gap-13">
        <ChapterListSidebar courseInfo={courseInfo} />
        <ChapterContent courseInfo={courseInfo} refreshData={()=>GetEnrolledCourseById()}/>
      </div>
    </div>
  );
}

export default Course;
