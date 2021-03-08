import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Controller, Get, Post } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import fetch from "node-fetch";

@Controller("api/submittals")
export class SubmittalsController {
    @Post()
    private async add(req: Request, res: Response) {
        const parsedData = {
            title: req.body.name,
            number: req.body.number,
            description: req.body.description,
            type: req.body.trade,
        };

        try {
            const api_res = fetch(
                `${process.env.PROCORE_URI}/rest/v1.0/projects/${process.env.PROJECT_ID}/submittals`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `${process.env.ACCESS_TOKEN}`,
                    },
                }
            );
            Logger.Info(api_res, true);
            return res.status(StatusCodes.OK).json(parsedData);
        } catch (error) {
            Logger.Err(error, true);
            return res.status(StatusCodes.BAD_REQUEST);
        }
    }
}
