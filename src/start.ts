import * as paht from "path";
import * as fs from "fs";

import ServerRouter from "./ServerRouter";

let server = new ServerRouter();

server.start(process.env.PORT);
