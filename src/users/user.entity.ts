import { Entity, Property, t } from '@mikro-orm/core';
import { BaseEntity } from 'common/database/base.entity';

@Entity()
export class User extends BaseEntity {
  @Property({ type: t.text })
  name!: string;
}
