import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { cid } = await req.json();
  const user = await currentUser();

  const enrollCourses = await db
    .select()
    .from(enrollCourseTable)
    .where(
      and(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
        eq(enrollCourseTable.cid, cid)
      )
    );
  if (enrollCourses?.length == 0) {
    const result = await db
      .insert(enrollCourseTable)
      .values({
        cid: cid,
        userEmail: user.primaryEmailAddress?.emailAddress,
      })
      .returning(enrollCourseTable);
    return NextResponse.json(result);
  }
  return NextResponse.json({ resp: "Already exist Enrolled" });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");
  const user = await currentUser();
  if (cid) {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        and(
          eq(
            enrollCourseTable.userEmail,
            user?.primaryEmailAddress.emailAddress
          ),
          eq(enrollCourseTable.cid, cid)
        )
      );
    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
      .where(
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(enrollCourseTable.id));
    return NextResponse.json(result);
  }
}

export async function PUT(req) {
  const { completedChapter, cid } = await req.json();
  const user = await currentUser();

  const result = await db
    .update(enrollCourseTable)
    .set({
      completedChapters: completedChapter,
    })
    .where(
      and(
        eq(enrollCourseTable.cid, cid),
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress)
      )
    )
    .returning(enrollCourseTable);
     return NextResponse.json(result);
}

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const cid = searchParams.get("cid");
//   const user = await currentUser();

//   const serialize = (obj) => {
//     if (!obj) return null;
//     return JSON.parse(
//       JSON.stringify(obj, (_, value) =>
//         typeof value === "bigint" ? Number(value) : value
//       )
//     );
//   };

//   if (cid) {
//     const result = await db
//       .select()
//       .from(coursesTable)
//       .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
//       .where(
//         and(
//           eq(
//             enrollCourseTable.userEmail,
//             user?.primaryEmailAddress.emailAddress
//           ),
//           eq(enrollCourseTable.cid, cid)
//         )
//       );

//     if (!result?.[0]) {
//       return NextResponse.json(
//         { message: "Course not found or not enrolled" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(serialize(result[0]));
//   } else {
//     const result = await db
//       .select()
//       .from(coursesTable)
//       .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
//       .where(
//         eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)
//       )
//       .orderBy(desc(enrollCourseTable.id));

//     return NextResponse.json(serialize(result));
//   }
// }
