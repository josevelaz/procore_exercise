import * as paht from "path";
import * as fs from "fs";
import fetch from "node-fetch";
import ServerRouter from "./ServerRouter";
import { Logger } from "@overnightjs/logger";
import dotenv from "dotenv";
dotenv.config();

process.env.PROCORE_URI = "https://sandbox.procore.com";

let server = new ServerRouter();

async function retrieveProjectID(companyId: number) {
    Logger.Info("Retrieving Project Data...");

    try {
        let res = await fetch(
            `${process.env.PROCORE_URI}/rest/v1.0/projects?company_id=${companyId}`,
            {
                headers: {
                    Authorization: `${process.env.ACCESS_TOKEN}`,
                },
            }
        );
        let json = await res.json();
        process.env.PROJECT_ID = json[0].id;
        Logger.Info("Successfully fetched project data. Initiating Server... ");
    } catch (error) {
        Logger.Err(error);
    }
}

async function retrieveComanyInfo() {
    Logger.Info("Retrieving Company Data...");

    try {
        let res = await fetch(
            `${process.env.PROCORE_URI}/rest/v1.0/companies`,
            {
                method: "GET",
                headers: {
                    Authorization: `${process.env.ACCESS_TOKEN}`,
                },
            }
        );
        let json = await res.json();
        Logger.Info("Successfully fetched company information. ");
        const id = json[0].id;
        retrieveProjectID(id);
        server.start(process.env.PORT);
    } catch (error) {
        Logger.Err(error);
    }
}

(async function getToken() {
    try {
        let res = await fetch(
            `${process.env.PROCORE_URI}/oauth/token?grant_type=client_credentials&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_url=http://localhost`,
            {
                method: "POST",
            }
        );
        let json = await res.json();
        process.env.ACCESS_TOKEN = `${json.token_type} ${json.access_token}`;
        Logger.Info("Fetched access token");
        retrieveComanyInfo();
    } catch (error) {
        Logger.Err(error);
    }
})();
