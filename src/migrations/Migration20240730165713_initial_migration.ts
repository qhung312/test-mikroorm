import { Migration } from '@mikro-orm/migrations';

export class Migration20240730165713_initial_migration extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "tag" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(20) not null);',
    );

    this.addSql(
      'create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text not null);',
    );

    this.addSql(
      'create table "book" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" text not null, "description" varchar(1000) not null, "content" text not null, "author_id" int null);',
    );
    this.addSql('create index "book_title_index" on "book" ("title");');

    this.addSql(
      'create table "book_tags" ("book_id" int not null, "tag_id" int not null, constraint "book_tags_pkey" primary key ("book_id", "tag_id"));',
    );

    this.addSql(
      'alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "book_tags" add constraint "book_tags_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "book_tags" add constraint "book_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "book_tags" drop constraint "book_tags_tag_id_foreign";',
    );

    this.addSql('alter table "book" drop constraint "book_author_id_foreign";');

    this.addSql(
      'alter table "book_tags" drop constraint "book_tags_book_id_foreign";',
    );

    this.addSql('drop table if exists "tag" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "book" cascade;');

    this.addSql('drop table if exists "book_tags" cascade;');
  }
}
