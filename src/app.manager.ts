import express, {
  Application as ExApplication,
  Handler,
  Request,
  Response,
} from "express";
import { controllers } from "./app.modules";
import { MetadataKeys } from "./utils/decorators/metadata.keys";
import { IRouter } from "./utils/decorators/handlers.decorator";
import "reflect-metadata";

const winston = require("winston");
const expressWinston = require("express-winston");
const formidable = require("express-formidable");
const asyncHandler = require("express-async-handler");

class Application {
  private readonly _instance: ExApplication;
  get instance(): ExApplication {
    return this._instance;
  }
  constructor() {
    this._instance = express();
    this._instance.use(express.json());
    this._instance.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        meta: false,
        msg: "HTTP  ",
        expressFormat: true,
        colorize: false,
        ignoreRoute: function (req: Request, res: Response) {
          return false;
        },
      })
    );
    //this._instance.use(formidable());
    const info: Array<{ api: any; handler: any }> = [];
    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new controllerClass() as any;

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass
      );
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      );

      const exRouter: any = express.Router();

      routers.forEach(({ method, path, handlerName }) => {
        exRouter[method](
          path,

          controllerInstance[String(handlerName)].bind(controllerInstance)
        );
        const api: string = `${method.toLocaleUpperCase()} ${basePath} ${path}`;
        const handler: string = `${controllerClass.name}.${String(
          handlerName
        )}`;
        info.push({
          api,
          handler: handlerName,
        });
      });

      this._instance.use(basePath, exRouter);
    });
    console.table(info);
  }
}

export default new Application();
