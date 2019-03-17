import { controller, httpGet, httpPost } from "inversify-express-utils";
import winston = require("winston");

@controller("/")
export class HomeController {
  @httpGet("/")
  public get(): any {
    winston.log("info", "geet");
    const user = {
      name: "John",
      email: "john@awesome.com",
      plan: "Pro"
    };
    return (user);
  }
}
