import * as HapiSwagger from "hapi-swagger";
import * as Package from "../../package.json";

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: "OpenAPI",
    version: Package.version,
  },
};

export default {
  plugin: HapiSwagger,
  options: swaggerOptions,
};
