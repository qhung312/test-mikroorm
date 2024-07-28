import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityRepository,
  LoadStrategy,
  MikroORM,
} from '@mikro-orm/postgresql';
import { Book } from './book.entity';
import { CreateBookDto } from './create-book.dto';
import { EditBookDto } from './edit-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>,
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  public async createBook({
    title,
    content,
    authorId,
  }: CreateBookDto): Promise<Book> {
    const book = this.em.create(Book, {
      title,
      content,
      author: authorId,
    });

    await this.em.flush();

    return book;
  }

  public async getAllBooks(): Promise<Book[]> {
    const [books, count] = await this.bookRepository.findAndCount(
      { createdAt: { $gte: new Date('2021-01-01') } },
      {
        populate: ['tags'],
        orderBy: {
          title: 'desc',
        },
        offset: 5,
        limit: 10,
      },
    );
    return books;
  }

  public async updateBookById(
    id: number,
    { title }: EditBookDto,
  ): Promise<Book> {
    const book = await this.bookRepository.findOneOrFail({ id });
    if (title) {
      book.title = title;
    }

    await this.em.flush();

    return book;
  }

  public async isBookGood(id: number): Promise<boolean> {
    const book = await this.bookRepository.findOneOrFail({ id });
    return true;
  }

  public async deleteBook(id: number): Promise<void> {
    await this.em.remove(this.em.getReference(Book, id)).flush();
  }
}
