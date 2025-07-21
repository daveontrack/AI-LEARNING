// import { NextResponse } from "next/server";
// import { ai } from "@/lib/ai";
// import axios from "axios";
// import { db } from "@/config/db";
// import { coursesTable } from "@/config/schema";
// import { eq } from "drizzle-orm";

// const PROMPT = `Depends on Chapter name and Topic, generate content for each topic in HTML and return JSON.
// Schema:
// {
//   chapterName: <>,
//   topics: [
//     {
//       topic: <>,
//       content: <>
//     }
//   ]
// }
// User Input:
// `;

// export async function POST(req) {
//   const { courseJson, courseTitle, cid } = await req.json();
//   const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

//   const promises = courseJson?.chapters?.map(async (chapter) => {
//     try {
//       const contents = [
//         {
//           role: "user",
//           parts: [{ text: PROMPT + JSON.stringify(chapter) }],
//         },
//       ];

//       const result = await model.generateContent({
//         contents,
//         generationConfig: { responseMimeType: "text/plain" },
//       });

//       const responseText =
//         result?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//       const cleanJson = responseText
//         .replace(/^```json\n?/, "")
//         .replace(/\n?```$/, "")
//         .trim();

//       if (!cleanJson || cleanJson.length < 10) {
//         console.warn("Skipped chapter due to empty/short AI response:", chapter);
//         return null;
//       }

//       let JSONResp;
//       try {
//         JSONResp = JSON.parse(cleanJson);
//       } catch (e) {
//         console.error("Invalid JSON from AI:", cleanJson);
//         return null;
//       }

//       const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

//       return {
//         youtubeVideo: youtubeData,
//         courseData: JSONResp,
//       };
//     } catch (error) {
//       console.error("Error generating content for chapter:", chapter, error);
//       return null;
//     }
//   });

//   const CourseContentWithNulls = await Promise.all(promises);
//   const CourseContent = CourseContentWithNulls.filter(Boolean);

//   await db
//     .update(coursesTable)
//     .set({ courseContent: CourseContent })
//     .where(eq(coursesTable.cid, cid));

//   return NextResponse.json({
//     courseName: courseTitle,
//     CourseContent,
//   });
// }

// const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

// const GetYoutubeVideo = async (topic) => {
//   const params = {
//     part: "snippet",
//     q: topic,
//     maxResults: 1, // ✅ Fixed typo
//     type: "video",
//     key: process.env.YOUTUBE_API_KEY,
//   };

//   try {
//     const resp = await axios.get(YOUTUBE_BASE_URL, { params });
//     const youtubeVideoListResp = resp.data.items || [];

//     return youtubeVideoListResp.map((item) => ({
//       videoId: item.id?.videoId,
//       title: item.snippet?.title,
//     }));
//   } catch (err) {
//     console.error("YouTube API error:", err);
//     return [];
//   }
// };
import { NextResponse } from "next/server";
import { ai } from "@/lib/ai";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `Depends on Chapter name and Topic, generate content for each topic in HTML and return JSON.
Schema:
{
  chapterName: <>,
  topics: [
    {
      topic: <>,
      content: <>
    }
  ]
}
User Input:
`;

export async function POST(req) {
  try {
    const { courseJson, courseTitle, cid } = await req.json();

    // Validate input
    if (
      !cid ||
      !courseTitle ||
      !courseJson ||
      !Array.isArray(courseJson?.chapters)
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid request: cid, courseTitle or courseJson.chapters is missing or malformed.",
        },
        { status: 400 }
      );
    }

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const promises = courseJson.chapters.map(async (chapter) => {
      try {
        const contents = [
          {
            role: "user",
            parts: [{ text: PROMPT + JSON.stringify(chapter) }],
          },
        ];

        const result = await model.generateContent({
          contents,
          generationConfig: { responseMimeType: "text/plain" },
        });

        const responseText =
          result?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        const cleanJson = responseText
          .replace(/^```json\n?/, "")
          .replace(/\n?```$/, "")
          .trim();

        if (!cleanJson || cleanJson.length < 10) {
          console.warn("AI response too short/empty, skipping:", chapter);
          return null;
        }

        let JSONResp;
        try {
          JSONResp = JSON.parse(cleanJson);
        } catch (e) {
          console.error("Invalid JSON from AI:", cleanJson);
          return null;
        }

        const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

        return {
          youtubeVideo: youtubeData,
          courseData: JSONResp,
        };
      } catch (err) {
        console.error("Error generating content for chapter:", chapter, err);
        return null;
      }
    });

    const CourseContentWithNulls = await Promise.all(promises);
    const CourseContent = CourseContentWithNulls.filter(Boolean);

    await db
      .update(coursesTable)
      .set({ courseContent: CourseContent })
      .where(eq(coursesTable.cid, cid));

    return NextResponse.json({
      courseName: courseTitle,
      CourseContent,
    });
  } catch (err) {
    console.error("POST /generate-course-content error:", err);
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const GetYoutubeVideo = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResults: 1,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
  };

  try {
    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp = resp.data.items || [];

    return youtubeVideoListResp.map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    }));
  } catch (err) {
    console.error("YouTube API error:", err);
    return [];
  }
};
