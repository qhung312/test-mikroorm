import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';
import { EditBookDto } from './edit-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  public async createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  public async getBooks() {
    return this.bookService.getAllBooks();
  }

  @Patch(':id')
  public async updateBook(
    @Body() editBookDto: EditBookDto,
    @Param('id') id: string,
  ) {
    return this.bookService.updateBookById(
      Number.parseInt(id, 10),
      editBookDto,
    );
  }

  @Get(':id/good')
  public async getIsBookGood(@Param('id') id: string) {
    return this.bookService.isBookGood(Number.parseInt(id, 10));
  }

  @Delete(':id')
  public async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(Number.parseInt(id, 10));
  }

  @Get('long')
  public async getLongBooks() {
    return this.bookService.getLongBooks();
  }
}
