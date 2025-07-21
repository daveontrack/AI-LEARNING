// import { integer, pgTable, varchar, boolean, json } from "drizzle-orm/pg-core";

// export const usersTable = pgTable("users", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   name: varchar({ length: 255 }).notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
//   subscriptionId: varchar({ length: 255 }),
// });

// export const coursesTable = pgTable("courses", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   cid: varchar({ length: 255 }).notNull(),
//   name: varchar({ length: 255 }),
//   description: varchar({ length: 1000 }),
//   noOfChapters: integer(),
//   includeVideo: boolean(),
//   level: varchar({ length: 100 }),
//   category: varchar({ length: 100 }),
//   courseJson: json(),
//   bannerImageUrl: varchar().default(""),
//   courseContent: json().default({}),
//   userEmail: varchar("userEmail", { length: 255 })
//     .references(() => usersTable.email)
//     .notNull(),
// });
// export const enrollCourseTable = pgTable("enrollCourse", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   cid: varchar("cid").references(() => coursesTable.cid),
//   userEmail: varchar("userEmail", { length: 255 })
//     .references(() => usersTable.email)
//     .notNull(),
//   completedChapters: json(),
// });
import { integer, pgTable, varchar, boolean, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar({ length: 255 }),
});

export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 }).notNull().unique(), // ✅ make cid unique!
  name: varchar({ length: 255 }),
  description: varchar({ length: 1000 }),
  noOfChapters: integer(),
  includeVideo: boolean(),
  level: varchar({ length: 100 }),
  category: varchar({ length: 100 }),
  courseJson: json(),
  bannerImageUrl: varchar().default(""),
  courseContent: json().default({}),
  userEmail: varchar("userEmail", { length: 255 })
    .references(() => usersTable.email)
    .notNull(),
});

export const enrollCourseTable = pgTable("enrollCourse", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar("cid", { length: 255 })
    .references(() => coursesTable.cid) // ✅ this now points to a UNIQUE column
    .notNull(),
  userEmail: varchar("userEmail", { length: 255 })
    .references(() => usersTable.email)
    .notNull(),
  completedChapters: json(),
});
