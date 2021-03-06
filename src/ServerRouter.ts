import * as bodyParser from "body-parser";
import * as controllers from "./controllers";
import { Server } from "@overnightjs/core";
import { Request, Response } from "express";
import { Logger } from "@overnightjs/logger";

class ServerRouter extends Server {
    private readonly WELCOME_MESSAGE = "Welcome to a Procare MicroService";
    private readonly START_MESSAGE = "Server started on port: ";
    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setupControllers();
    }

    private setupControllers(): void {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === "function") {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances);
    }
    public start(port?: string | number): void {
        port = port || 8000;
        this.app.get("*", (req: Request, res: Response) => {
            res.send(this.WELCOME_MESSAGE);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.START_MESSAGE + port);
        });
    }
}

export default ServerRouter;
