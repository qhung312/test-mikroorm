import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { BaseEntity } from './common/database/base.entity';
import { Book } from './books/book.entity';
import { Tag } from './tags/tag.entity';
import { User } from './users/user.entity';
const path = require('path');

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: 'postgres',
  entities: [BaseEntity, User, Book, Tag],
  debug: true,
  highlighter: new SqlHighlighter(),
});
