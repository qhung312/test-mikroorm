import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityRepository,
  MikroORM,
} from '@mikro-orm/postgresql';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    await this.em.persistAndFlush(user);
    return user;
  }

  public async getUsers() {
    return this.userRepository.findAll({
      orderBy: { updatedAt: 'desc' },
    });
  }
}
