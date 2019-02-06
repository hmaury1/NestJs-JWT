import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async index() {
    try {
      return await this.userRepository.find();
    } catch (err) {
      return {err};
    }
  }

  async find(id: number) {
    try {
      return await this.userRepository.findOne(id)
    } catch (err) {
      return {err};
    }
  }

  async update(id: number, userData: Partial<User>) {
    try {
      await this.userRepository.update(id, userData);
      return this.userRepository.findOne(id);
    } catch (err) {
      return {err};
    }
  }

  async create(p: User) {
    try {
        return await this.userRepository.save(p);
    } catch (err) {
      return {err};
    }
  }

  async delete(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (err) {
      return {err};
    }
  }

  async getMenu(id: number) {
    try {
      return await this.userRepository.query('SELECT * FROM [dbo].[fnGetMenuByUserId] ($1)', [id]);
    } catch (err) {
      return {err};
    }
  }

}
