// import { Gift } from "lucide-react";
// import React from "react";

// function ChapterTopicList({ course }) {
//   const courseLayout = course?.courseJson?.course;

//   return (
//     <div>
//       <h2 className="font-bold text-3xl mt-10">Chapters & Topics</h2>

//       <div className="flex flex-col items-center justify-center mt-10">
//         {courseLayout?.chapters.map((chapter, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="p-4 border shadow rounded-xl bg-primary text-white mb-4">
//               <h2 className="text-center">Chapter {index + 1}</h2>
//               <h2 className="font-bold text-lg text-center">
//                 {chapter.chapterName}
//               </h2>
//               <h2 className="text-xs flex justify-between gap-16">
//                 <span>Duration: {chapter?.duration}</span>
//                 <span>No. of Chapters: {chapter?.topics?.length}</span>
//               </h2>
//             </div>

//             {chapter?.topics.map((topic, index) => (
//               <div key={index} className="flex flex-col items-center">
//                 <div className="h-10 bg-gray-300 w-1"></div>
//                 <div className="flex items-center gap-5">
//                   <span className={`${index % 2 === 0 && "text-transparent"}`}>
//                     {topic.topicName}
//                   </span>

//                   <h2 className="text-center rounded-full bg-gray-300 px-6 py-2">
//                     {topic.topicName}
//                   </h2>

//                   <span
//                     className={`${index % 2 !== 0 ? "text-transparent" : ""}`}
//                   >
//                     {topic.topicName}
//                   </span>
//                 </div>

//                 {index === chapter?.topics?.length - 1 && (
//                   <>
//                     <div className="h-10 bg-gray-300 w-1"></div>
//                     <div className="flex items-center">
//                       <Gift className="text-center rounded-full bg-gray-300 h-10 w-10" />
//                     </div>
//                     <div className="h-10 bg-gray-300 w-1"></div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ChapterTopicList;

// import { Gift } from "lucide-react";
// import React from "react";

// function ChapterTopicList({ course }) {
//   const courseLayout = course?.courseJson?.course;

//   return (
//     <div>
//       <h2 className="font-bold text-3xl mt-10">Chapters & Topics</h2>

//       <div className="flex flex-col items-center mt-10">
//         {courseLayout?.chapters.map((chapter, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center w-full max-w-2xl"
//           >
//             {/* Chapter header */}
//             <div className="p-4 border shadow rounded-xl bg-primary text-white text-center w-full mb-8">
//               <h2 className="text-sm">Chapter {index + 1}</h2>
//               <h2 className="font-bold text-lg">{chapter.chapterName}</h2>
//               <p className="text-xs flex justify-between mt-2">
//                 <span>Duration: {chapter?.duration}</span>
//                 <span>No. of Topics: {chapter?.topics?.length}</span>
//               </p>
//             </div>

//             {/* Topics Timeline */}
//             <div className="relative border-l-2 border-gray-300 pl-8">
//               {chapter?.topics.map((topic, i) => (
//                 <div key={i} className="mb-10 relative">
//                   <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-black">
//                     {i + 1}
//                   </div>
//                   <div className="ml-4">{topic.topicName}</div>
//                 </div>
//               ))}

//               {/* Gift icon at the end */}
//               <div className="flex items-center gap-4 mt-4">
//                 <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//                   <Gift className="h-5 w-5" />
//                 </div>
//                 <span className="text-sm text-gray-500">End of Chapter</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ChapterTopicList;

import { Gift } from "lucide-react";
import React from "react";

function ChapterTopicList({ course }) {
  const courseLayout = course?.courseJson?.course;

  return (
    <div>
      <h2 className="font-bold text-3xl mt-10 text-center">
        Chapters & Topics
      </h2>

      <div className="mt-10 flex flex-col items-center gap-20">
        {courseLayout?.chapters.map((chapter, index) => (
          <div key={index} className="w-full max-w-4xl">
            {/* Chapter Card */}
            <div className="bg-primary text-white rounded-lg shadow-md text-center py-5 px-6 mb-10">
              <p className="text-sm">Chapter {index + 1}</p>
              <h3 className="text-lg font-bold">{chapter.chapterName}</h3>
              <div className="flex justify-between text-xs mt-2">
                <span>Duration: {chapter.duration}</span>
                <span>No. of Topics: {chapter.topics?.length}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-gray-300 pl-8">
              {chapter.topics.map((topic, i) => (
                <div key={i} className="relative mb-10">
                  <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                    {i + 1}
                  </div>
                  <div className="ml-4 text-base">{topic}</div>
                </div>
              ))}

              {/* End of Chapter Icon */}
              <div className="flex items-center gap-3 mt-6">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-gray-700" />
                </div>
                <span className="text-sm text-gray-600">End of Chapter</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterTopicList;
