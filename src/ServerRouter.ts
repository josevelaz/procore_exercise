import * as bodyParser from "body-parser"
import * as controllers from "./controller"
import {Server} from "@overnightjs/core"
import {Request, Response} from "express"

class ServerRouter extends Server {
  controllers() {
  super(true)
  this.app.use(bodyParser.json());
  this.app.ise(bodyParser.urlencoded({extended: true}));
  this.setupControllers()
  }

  private setupControllers(f
}
