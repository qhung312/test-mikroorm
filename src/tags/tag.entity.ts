import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Book } from '../books/book.entity';
import { BaseEntity } from 'common/database/base.entity';

@Entity()
export class Tag extends BaseEntity {
  @Property({ length: 20 })
  name: string;

  @ManyToMany({ entity: () => Book, mappedBy: 'tags' })
  books = new Collection<Book>(this);
}
