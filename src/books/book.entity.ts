import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
  t,
} from '@mikro-orm/core';
import { BaseEntity } from 'common/database/base.entity';
import { Tag } from 'tags/tag.entity';
import { User } from 'users/user.entity';

@Entity()
export class Book extends BaseEntity {
  @Property({ type: t.text, index: true })
  title!: string;

  @Property({ length: 1000 })
  description: string;

  @Property({ type: t.text, lazy: true })
  content: string;

  @ManyToOne({ entity: () => User, nullable: true })
  author!: User;

  @ManyToMany({ entity: () => Tag, inversedBy: 'books' })
  tags = new Collection<Tag>(this);

  constructor(title: string, content: string, author: User) {
    super();
    this.title = title;
    this.content = content;
    this.author = author;

    this.description = crypto.randomUUID();
  }
}
