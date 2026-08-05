CREATE TABLE "candidate_articles" (
	"candidate_id" integer NOT NULL,
	"article_id" integer NOT NULL,
	CONSTRAINT "candidate_articles_candidate_id_article_id_pk" PRIMARY KEY("candidate_id","article_id")
);
--> statement-breakpoint
CREATE TABLE "candidates" (
	"id" serial PRIMARY KEY NOT NULL,
	"day" date NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"kind" text,
	"importance" integer NOT NULL,
	"source_count" integer NOT NULL,
	"first_seen" date NOT NULL,
	"last_seen" date NOT NULL,
	"thread_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "triaged_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "candidate_articles" ADD CONSTRAINT "candidate_articles_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_articles" ADD CONSTRAINT "candidate_articles_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_thread_id_candidates_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."candidates"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "candidate_articles_article_id_idx" ON "candidate_articles" USING btree ("article_id");--> statement-breakpoint
CREATE INDEX "candidates_day_idx" ON "candidates" USING btree ("day");--> statement-breakpoint
CREATE INDEX "candidates_thread_id_idx" ON "candidates" USING btree ("thread_id");--> statement-breakpoint
CREATE INDEX "articles_triaged_at_idx" ON "articles" USING btree ("triaged_at");