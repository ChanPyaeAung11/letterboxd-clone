import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

export const memberEnum = pgEnum("member_type", ["Free", "Pro", "Patron"]);

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  memberType: memberEnum("member_type").notNull(),
});

export type memberRecord = InferSelectModel<typeof members>;
export const memberInsertSchema = createInsertSchema(members);
export type memberInsert = z.infer<typeof memberInsertSchema>;

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  releaseDate: date("release_date").notNull(),
  posterName: text("poster_name").notNull().unique(),
  description: text("description").notNull(),
});

export type movieRecord = InferSelectModel<typeof movies>;
export const movieInsertSchema = createInsertSchema(movies);
export type movieInsert = z.infer<typeof movieInsertSchema>;

export const scoreEnum = pgEnum("score_type", [
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "4.5",
  "5",
]);

export const membersData = pgTable("members_data", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id")
    .notNull()
    .references(() => members.id),
  movieId: integer("movie_id")
    .notNull()
    .references(() => movies.id),
  liked: boolean("liked").notNull(),
  firstTime: boolean("first_time").notNull(),
  score: scoreEnum("score").notNull(),
  review: text("review"),
  watchedDate: date("watched_date").notNull(),
});
export type memberDataRecord = InferSelectModel<typeof membersData>;
export const memberDataInsertSchema = createInsertSchema(membersData);
export type memberDataInsert = z.infer<typeof memberDataInsertSchema>;
