import { Request, Response } from "express";
import { createMethodDecorator } from "./custom.decorator";

export const Authorization = (): MethodDecorator => {
  return createMethodDecorator(
    (req: Request, res: Response, org: any, args: any) => {
      const headers = req.headers;
      if (!headers.authorization)
        return res.status(401).json({
          statusCode: 401,
          message: "Unauthorized",
        });
      const token: string = headers.authorization.replace(`Bearer `, "");

      if (headers.authorization) {
        return org.apply(this, args);
      }
      return "coucou";
    }
  );
};
