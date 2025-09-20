import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { IUserCreate, IUserFindUnique, IUserFindMany, IUserUpdate } from "./user.type";

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(data: IUserCreate) {
    return this.repository.create(data);
  }

  async findUnique(args: IUserFindUnique) {
    return this.repository.findUnique(args);
  }
  async fidnMany(query: IUserFindMany) {
    return this.repository.findMany(query);
  }

  async update(id: number, args: IUserUpdate) {
    return this.repository.update({ id }, args);
  }

  async softDelete(id: number) {
    return this.repository.sofrDelete(id);
  }
}
