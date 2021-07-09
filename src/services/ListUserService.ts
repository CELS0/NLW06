import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { classToPlain } from "class-transformer"



class ListUserService {
  async execute() {
    const listUserService = getCustomRepository(UsersRepositories);
    const users = await listUserService.find();

    return classToPlain(users);
  }

}
export { ListUserService }