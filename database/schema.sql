set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."projects" (
	"projectId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"html" TEXT,
	"css" TEXT,
	"javascript" TEXT,
	"userId" integer NOT NULL,
	"createdAt" timestamptz(0) NOT NULL default now(),
	"modifiedAt" timestamptz(0) NOT NULL default now(),
	CONSTRAINT "projects_pk" PRIMARY KEY ("projectId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."projectPermissions" (
	"projectId" integer NOT NULL,
	"userId" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "projects" ADD CONSTRAINT "projects_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "projectPermissions" ADD CONSTRAINT "projectPermissions_fk0" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId");
ALTER TABLE "projectPermissions" ADD CONSTRAINT "projectPermissions_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
