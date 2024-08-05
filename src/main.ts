import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/postgresql';
import { AppModule } from './app.module';

async function bootstrap(migrate = true) {
  const app = await NestFactory.create(AppModule);

  const orm = app.get(MikroORM);

  if (migrate) {
    await orm.getMigrator().up();
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
