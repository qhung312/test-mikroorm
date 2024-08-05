import { EntityRepository } from '@mikro-orm/postgresql';
import { Book } from './book.entity';
import { LongBook } from './long-book.entity';

export class BookRepository extends EntityRepository<Book> {
  longBooksQuery() {
    return this.em
      .createQueryBuilder('cache.long_book')
      .select(['title', 'description']);
  }

  public async findBooks(): Promise<Book[]> {
    return this.em.find(Book, {});
  }

  public async findLongBooks(): Promise<LongBook[]> {
    return this.em.find(LongBook, {});
  }
}
