import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Controller, Get, Post } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import fetch from "node-fetch";

@Controller("api/submittals")
export class SubmittalsController {
    @Post()
    private async add(req: Request, res: Response) {
        const data = {
            title: req.body.name,
            number: req.body.number,
            description: req.body.description,
            type: req.body.trade,
        };

        try {
            const api_res = await fetch(
                `${process.env.PROCORE_URI}/rest/v1.0/projects/${process.env.PROJECT_ID}/submittals`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `${process.env.ACCESS_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ submittal: data }),
                }
            );
            const json = await api_res.json();
            return res.status(StatusCodes.OK).json(json);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST);
        }
    }

    @Get("")
    private async retrieve(req: Request, res: Response) {
        try {
            const api_res = await fetch(
                `${process.env.PROCORE_URI}/rest/v1.0/projects/${process.env.PROJECT_ID}/submittals`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `${process.env.ACCESS_TOKEN}`,
                    },
                }
            );

            let json = await api_res.json();
            return res.status(StatusCodes.OK).json(json);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error);
        }
    }
}
