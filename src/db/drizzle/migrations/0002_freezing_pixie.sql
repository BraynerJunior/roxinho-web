ALTER TABLE "interviews" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "interviews" ADD COLUMN "guest_name" varchar(255);--> statement-breakpoint
ALTER TABLE "interviews" ADD COLUMN "guest_email" varchar(255);--> statement-breakpoint
ALTER TABLE "interviews" ADD COLUMN "guest_job_role_id" integer;--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_guest_job_role_id_job_roles_id_fk" FOREIGN KEY ("guest_job_role_id") REFERENCES "public"."job_roles"("id") ON DELETE no action ON UPDATE no action;