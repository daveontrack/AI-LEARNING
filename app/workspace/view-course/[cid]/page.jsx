//import { useParams } from "next/navigation";
import React from "react";
import EditCourse from "../../edit-course/[cid]/page";

function ViewCourse() {
  // const { cid } = useParams();
  return (
    <div>
      <EditCourse ViewCourse={true} />
    </div>
  );
}

export default ViewCourse;
