import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column('text')
  @ApiProperty()
  fullName: string;

  @Column('text')
  @ApiProperty()
  email: string;

  @Column('text')
  @ApiProperty()
  password: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  @ApiProperty()
  rol: string[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
