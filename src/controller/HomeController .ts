import { controller, httpGet, httpPost } from "inversify-express-utils";
import winston = require("winston");
import { inject } from "inversify";
import { HomeService } from "../service/HomeService";
import TYPES from "../util/Types";

@controller("/")
export class HomeController {

  constructor(@inject(TYPES.HomeService) private service: HomeService) { }
  @httpGet("/")
  public get(): any {
    winston.log("info", "geet");
    return this.service.getUserDetails();
  }
}
