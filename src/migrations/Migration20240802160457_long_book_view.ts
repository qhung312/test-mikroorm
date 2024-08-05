import { Migration } from '@mikro-orm/migrations';

export class Migration20240802160457_long_book_view extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `
      create schema if not exists views;
      create schema if not exists cache;
      `,
    );

    this.addSql(
      `
      create view views.long_book as
      select
        "id",
        "title",
        "description",
        "created_at",
        "updated_at"
      from book
      where length("title") > 5;
      `,
    );

    this.addSql(
      `
      create materialized view cache.long_book as
      select
        "id",
        "title",
        "description",
        "created_at",
        "updated_at"
      from views.long_book;
      `,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop view views.long_book;');
    this.addSql('drop view cache.long_book;');

    this.addSql('drop schema if exists views;');
    this.addSql('drop schema if exists cache;');
  }
}
