// import { db } from "@/config/db";
// import { coursesTable } from "@/config/schema";
// import { currentUser } from "@clerk/nextjs/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";
// import { nanoid } from "nanoid"; // ✅ add this
// import axios from "axios";

// const PROMPT = `Generate Learning Course depends on the following details. In which make sure to add Course Name, Description, Chapter Name, Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3D format, Topic under each chapter, Duration for each chapter, etc., in JSON format only.
// schema:
// {
//   "course": {
//     "name": "string",
//     "description": "string",
//     "category": "string",
//     "level": "string",
//     "includeVideo": "boolean",
//     "noOfChapters": "number",
//    "bannerImagePrompt": "Create a modern, flat-style 2D digital illustration representing the course topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to the course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in the course."

//     "chapters": [
//       {
//         "chapterName": "string",
//         "duration": "string",
//         "topics": [
//           "string"
//         ],
//         "imagePrompt": "string"
//       }
//     ]
//   }
// }
// `;
// export const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function POST(req) {
//   try {
//     const formData = await req.json();
//     const user = await currentUser();

//     // const ai = new GoogleGenAI({
//     //   apiKey: process.env.GEMINI_API_KEY,
//     // });

//     const contents = [
//       {
//         role: "user",
//         parts: [{ text: PROMPT + JSON.stringify(formData) }],
//       },
//     ];

//     const result = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       config: { responseMimeType: "text/plain" },
//       contents,
//     });

//     const responseText =
//       result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
//     const cleanJson = responseText
//       .replace(/^```json\n/, "")
//       .replace(/\n```$/, "");
//     const JSONResp = JSON.parse(cleanJson);
//     const ImagePrompt = JSONResp.course?.bannerImagePrompt;

//     const bannerImageUrl = await GenerateImage(ImagePrompt);

//     console.log("AI Response:", cleanJson);
//     const cid = nanoid();
//     // Insert course into DB with required and cleaned fields
//     await db.insert(coursesTable).values({
//       cid,
//       name: formData.name,
//       description: formData.description,
//       category: formData.category,
//       level: formData.level,
//       includeVideo: formData.includeVideo,
//       noOfChapters: formData.noOfChapters,
//       courseJson: cleanJson,
//       courseContent: {},
//       userEmail: user?.primaryEmailAddress?.emailAddress || "unknown",
//       bannerImageUrl,
//     });

//     return NextResponse.json({ cid, data: cleanJson });
//   } catch (e) {
//     console.error("API Error:", e);
//     return NextResponse.json(
//       { error: "Internal Server Error", message: e.message },
//       { status: 500 }
//     );
//   }
// }
// const GenerateImage = async (imagePrompt) => {
//   const BASE_URL = "https://aigurulab.tech";
//   const result = await axios.post(
//     BASE_URL + "/api/generate-image",
//     {
//       width: 1024,
//       height: 1024,
//       input: imagePrompt,

//       model: "flux", //'flux'
//       aspectRatio: "16:9", //Applicable to Flux model only
//     },
//     {
//       headers: {
//         "x-api-key": process?.env?.AI_GURU_LAB_API, // Your API Key
//         "Content-Type": "application/json", // Content Type
//       },
//     }
//   );

//   console.log(result.data.image); //Output Result: Base 64 Image
//   return result.data.image;
// };
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import axios from "axios";

const PROMPT = `Generate Learning Course based on the following details. Include the following fields in JSON only:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "Create a modern, flat-style 2D digital illustration representing the course topic. Include UI/UX elements...",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"],
        "imagePrompt": "string"
      }
    ]
  }
}`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const formData = await req.json();
    const user = await currentUser();
    const { has } = await auth();
    const hasPremiumAccess = has({ plan: "starter" });

    const contents = [
      {
        role: "user",
        parts: [{ text: PROMPT + "\n\n" + JSON.stringify(formData) }],
      },
    ];

    // ⏳ Send request to Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents,
      generationConfig: { responseMimeType: "text/plain" },
    });
    //
    if (!hasPremiumAccess) {
      const result = await db
        .select()
        .from(coursesTable)
        .where(
          eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress)
        );
      if (result?.length >= 1) {
        return NextResponse.json({ resp: "limit exceed" });
      }
    }
    const responseText = result?.response?.text()?.trim?.() ?? "";

    // 🧪 Validate output
    if (!responseText || responseText.length < 20) {
      console.error("AI response too short or empty:", responseText);
      return NextResponse.json(
        { error: "AI returned an empty or invalid response" },
        { status: 500 }
      );
    }

    const cleanJson = responseText
      .replace(/^```json\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    const JSONResp = JSON.parse(cleanJson);
    const ImagePrompt = JSONResp?.course?.bannerImagePrompt;

    if (!ImagePrompt) {
      throw new Error("Missing bannerImagePrompt in AI response");
    }

    const bannerImageUrl = await GenerateImage(ImagePrompt);

    const cid = nanoid();

    await db.insert(coursesTable).values({
      cid,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      level: formData.level,
      includeVideo: formData.includeVideo,
      noOfChapters: formData.noOfChapters,
      courseJson: cleanJson,
      courseContent: {},
      userEmail: user?.primaryEmailAddress?.emailAddress || "unknown",
      bannerImageUrl,
    });

    return NextResponse.json({ cid, data: cleanJson });
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json(
      { error: "Internal Server Error", message: e.message },
      { status: 500 }
    );
  }
}

const GenerateImage = async (imagePrompt) => {
  const BASE_URL = "https://aigurulab.tech";

  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: "flux",
      aspectRatio: "16:9",
    },
    {
      headers: {
        "x-api-key": process.env.AI_GURU_LAB_API,
        "Content-Type": "application/json",
      },
    }
  );

  return result?.data?.image;
};
