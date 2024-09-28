ALTER TABLE "members" RENAME COLUMN "password" TO "password_hash";--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_poster_name_unique" UNIQUE("poster_name");