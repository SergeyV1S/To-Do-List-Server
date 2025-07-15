CREATE TABLE IF NOT EXISTS "tasks" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"priority" text NOT NULL,
	"category" text NOT NULL,
	"status" text NOT NULL,
	"createdDate" date
);
