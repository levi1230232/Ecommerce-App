CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  "email_address" varchar(100) UNIQUE NOT NULL,
  "password" text,
  "role" INT NOT NULL DEFAULT 0
);


CREATE TABLE IF NOT EXISTS "products" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "price" money NOT NULL,
  "image" text NOT NULL,
  "short_description" varchar(200),
  "long_description" text,
  "rating_count" integer
);

CREATE TABLE IF NOT EXISTS "cart_products" (
  "id" SERIAL,
  "user_id" integer,
  "product_id" integer,
  "quantity" smallint NOT NULL DEFAULT 1,
  PRIMARY KEY ("user_id", "product_id", "id")
);

CREATE TABLE IF NOT EXISTS "orders" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "order_placed_time" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status" varchar(100) NOT NULL,
  "total_cost" money NOT NULL,
  "description" text NOT NULL
);


CREATE TABLE IF NOT EXISTS "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS "product_categories" (
  "product_id" integer,
  "category_id" integer,
  PRIMARY KEY ("product_id", "category_id")
);

CREATE TABLE IF NOT EXISTS "order_details" (
  "order_id" integer,
  "product_id" integer,
  "quantity" smallint NOT NULL DEFAULT 1,
  "price" money NOT NULL,
  PRIMARY KEY ("order_id", "product_id"),
  FOREIGN KEY ("order_id") REFERENCES "orders" ("id"),
  FOREIGN KEY ("product_id") REFERENCES "products" ("id")
);

ALTER TABLE "cart_products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "cart_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "product_categories" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE "product_categories" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
