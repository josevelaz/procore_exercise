import * as bodyParser from "body-parser"
import * as controllers from "./controller"
import {Server} from "@overnightjs/core"
import {Request, Response} from "express"

class ServerRouter extends Server {
  constructor() {
  super(true)
  this.app.use(bodyParser.json());
  this.app.ise(bodyParser.urlencoded({extended: true}));
  this.setupControllers()
  }

  private setupControllers(): void {
    const controllerInstances = [];
    for (const name of Object.keys(controllers)) {
      const controller = (controllers as any)[name]
      if(typeof controller === "function") {
        controllerInstances.push(new controller())
      }
    }
    super.addControllers(controllerInstances)
  }

  
}
