import { Migration } from '@mikro-orm/migrations';

export class Migration20240730170958_add_published_column extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "book" add column "is_published" boolean not null default false;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "book" drop column "is_published";');
  }
}
