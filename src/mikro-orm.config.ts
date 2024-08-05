import { defineConfig, PostgreSqlDriver, Utils } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { BaseEntity } from './common/database/base.entity';
import { Book } from './books/book.entity';
import { Tag } from './tags/tag.entity';
import { User } from './users/user.entity';
import { LongBook } from 'books/long-book.entity';

export default defineConfig({
  driver: PostgreSqlDriver,
  // host: '0.0.0.0',
  // user: 'root',
  dbName: 'postgres',
  // password: '123',
  entities: [BaseEntity, User, Book, Tag, LongBook],
  debug: true,
  highlighter: new SqlHighlighter(),
  extensions: [Migrator],
  migrations: {
    path: Utils.detectTsNode() ? 'src/migrations' : 'dist/migrations',
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
});
