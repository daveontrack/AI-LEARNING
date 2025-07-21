import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams?.get("cid");
  const user = await currentUser();

  if (cid) {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, cid));

    console.log(result);

    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(coursesTable)
      .where(
        eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(coursesTable.id));

    console.log(result);

    return NextResponse.json(result);
  }
}
// // }
// import { db } from "@/config/db";
// import { coursesTable } from "@/config/schema";
// import { currentUser } from "@clerk/nextjs/server";
// import { eq, desc } from "drizzle-orm";
// import { NextResponse } from "next/server";

// // Helper to handle BigInt serialization
// function fixBigInt(obj) {
//   return JSON.parse(JSON.stringify(obj, (_, value) =>
//     typeof value === "bigint" ? value.toString() : value
//   ));
// }

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const cid = searchParams.get("cid");
//     const user = await currentUser();

//     if (cid) {
//       // Fetch course by cid
//       const result = await db
//         .select()
//         .from(coursesTable)
//         .where(eq(coursesTable.cid, cid));

//       if (result.length === 0) {
//         return NextResponse.json({ message: "Course not found" }, { status: 404 });
//       }

//       return NextResponse.json(fixBigInt(result[0]));
//     } else {
//       // Fetch all courses for current user
//       const email = user?.primaryEmailAddress?.emailAddress;

//       if (!email) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//       }

//       const result = await db
//         .select()
//         .from(coursesTable)
//         .where(eq(coursesTable.userEmail, email))
//         .orderBy(desc(coursesTable.id));

//       return NextResponse.json(result.map(fixBigInt));
//     }

//   } catch (error) {
//     console.error("Error in /api/courses GET:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }
