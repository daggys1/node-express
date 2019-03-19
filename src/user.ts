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

// load everything needed to the Container
const container = new Container();

// start the server
const server = new InversifyExpressServer(container);

// get properties from env

const properties = dotenv.config();

if (process.env.yoga !== null) {
console.log(process.env.yoga);
console.log(properties);
}

  // create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
// setup the logger
  app.use(morgan("combined"));
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
serverInstance.listen(3000);
