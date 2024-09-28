DO $$ BEGIN
 CREATE TYPE "public"."member_type" AS ENUM('Free', 'Pro', 'Patron');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."score_type" AS ENUM('0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"member_type" "member_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_id" integer NOT NULL,
	"movie_id" integer NOT NULL,
	"liked" boolean NOT NULL,
	"first_time" boolean NOT NULL,
	"score" "score_type" NOT NULL,
	"review" text,
	"watched_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"release_date" date NOT NULL,
	"poster_name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "members_data" ADD CONSTRAINT "members_data_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "members_data" ADD CONSTRAINT "members_data_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
