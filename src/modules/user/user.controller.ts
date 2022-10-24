import { Request, Response } from "express";
import { stringify } from "querystring";
import { Authorization } from "../../utils/decorators/auth.decorator";
import Controller from "../../utils/decorators/controller.decorator";
import { Get, Post } from "../../utils/decorators/handlers.decorator";
import {
  ApiResponse,
  StatusError,
  StatusSuccess,
} from "../../utils/HttpException/HttpException";
import UserService from "./user.service";

@Controller("/users")
export default class UserController {
  private userService: UserService = new UserService();

  @Post("/")
  public async postUser(req: Request, res: Response) {
    try {
      const user = await this.userService.create(req.body);
      return ApiResponse(res, StatusSuccess.CREATED, user);
    } catch (e) {
      return ApiResponse(res, StatusError.BAD_REQUEST, e);
    }
  }

  @Get("")
  public getUser(req: Request, res: Response) {
    return ApiResponse(res, StatusSuccess.OK, "OK");
  }
}
