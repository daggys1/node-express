import { controller, httpGet, httpPost } from "inversify-express-utils";
import winston = require("winston");
import { inject } from "inversify";
import { HomeService } from "../service/HomeService";
import TYPES from "../util/Types";
import { Request, Response } from "express";

@controller("/user")
export class HomeController {

  constructor(@inject(TYPES.HomeService) private service: HomeService) { }
  @httpGet("/:id")
  public get(req: Request, res: Response): any {
    winston.log("info", "geet");
    if (req.params.id === null) {
      throw res.send("Github User id required").status(400);
    }
    return this.service.getUserDetails(req.params.id);
  }
}
