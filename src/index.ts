import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as r from "reflect-metadata";
// import TYPES from "./constants/types";
// import { UserService } from "./service/UserService";

// load everything needed to the Container
const container = new Container();
// container.bind<UserService>(TYPES.UserService).to(UserService);

// start the server
const server = new InversifyExpressServer(container);

// get properties from env

const properties = dotenv.config();

if (process.env.yoga !== null) {
console.log(process.env.yoga);
}

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

const serverInstance = server.build();
serverInstance.listen(3000);
