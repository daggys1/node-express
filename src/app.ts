import "reflect-metadata";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import fs from "fs";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import path from "path";
import "./controller/HomeController ";
import winston from "winston";
import { Utils } from "./util/Utils";
import os from "os";
import { HomeService } from "./service/HomeService";
import TYPES from "./util/Types";

// load everything needed to the Container
const container = new Container();

container.bind<HomeService>(TYPES.HomeService).to(HomeService);
// start the server
const server = new InversifyExpressServer(container);

// get properties from env

const properties = dotenv.config();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  // setup the logger
  app.use(morgan("combined"));
  app.use(function (err: any, req: any, res: any, next: any) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
});

const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console)
  ]
});
const serverInstance = server.build();
try {
  serverInstance.listen(Utils.getPort());
} catch (error) {
  console.log(error);
}

console.log(`Application started on port: ${Utils.getPort()}`);
console.log(`Use http://localhost:${Utils.getPort()}/`);
