import { MetadataKeys } from "./metadata.keys";
import "reflect-metadata";

const Controller = (basePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
};
export default Controller;
