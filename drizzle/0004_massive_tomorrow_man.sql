CREATE TABLE "analogies" (
	"id" serial PRIMARY KEY NOT NULL,
	"story_id" integer NOT NULL,
	"position" integer NOT NULL,
	"category" text NOT NULL,
	"title" text NOT NULL,
	"source" text NOT NULL,
	"excerpt" text NOT NULL,
	"href" text NOT NULL,
	"image_src" text,
	"image_alt" text,
	"image_credit" text,
	"verification_status" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "analogies_story_position_unq" UNIQUE("story_id","position")
);
--> statement-breakpoint
CREATE TABLE "issues" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"title" text NOT NULL,
	"week_start" date NOT NULL,
	"week_end" date NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "issues_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"issue_id" integer NOT NULL,
	"slug" text NOT NULL,
	"headline" text NOT NULL,
	"overview" text NOT NULL,
	"genre" text NOT NULL,
	"sources" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rank" integer,
	"lead" boolean DEFAULT false NOT NULL,
	"image_src" text,
	"image_alt" text,
	"image_credit" text,
	"published_at" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "stories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "story_candidates" (
	"story_id" integer NOT NULL,
	"candidate_id" integer NOT NULL,
	CONSTRAINT "story_candidates_story_id_candidate_id_pk" PRIMARY KEY("story_id","candidate_id")
);
--> statement-breakpoint
ALTER TABLE "analogies" ADD CONSTRAINT "analogies_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stories" ADD CONSTRAINT "stories_issue_id_issues_id_fk" FOREIGN KEY ("issue_id") REFERENCES "public"."issues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_candidates" ADD CONSTRAINT "story_candidates_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_candidates" ADD CONSTRAINT "story_candidates_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "analogies_story_id_idx" ON "analogies" USING btree ("story_id");--> statement-breakpoint
CREATE INDEX "stories_issue_id_idx" ON "stories" USING btree ("issue_id");--> statement-breakpoint
CREATE INDEX "stories_rank_idx" ON "stories" USING btree ("rank");