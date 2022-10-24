import { UserEntity } from "./entity/user.entity";
import { UserReposirtory } from "./user.repository";

export default class UserService {
  constructor(private userReposirtory = UserReposirtory) {}
  create(user: UserEntity) {
    return this.userReposirtory.create({
      data: user,
    });
  }

  findOne(id: number) {
    const User = this.userReposirtory.findUnique({
      where: {
        id,
      },
      /*include: {
        posts: true,
      },*/
    });
  }

  async find(id: number) {
    const User = await this.userReposirtory.findMany({
      where: {
        id,
      },
    });
  }

  async update(user: UserEntity) {
    const User = await this.userReposirtory.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }

  async delete(id: number) {
    const User = await this.userReposirtory.delete({
      where: {
        id,
      },
    });
  }
}
