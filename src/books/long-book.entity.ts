import { Entity, Property, t } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Book } from './book.entity';

@Entity({
  expression: (em: EntityManager) => {
    return em.getRepository(Book).longBooksQuery();
  },
})
export class LongBook {
  @Property({ type: t.text })
  title!: string;

  @Property({ type: t.text, length: 1000 })
  description!: string;
}
