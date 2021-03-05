import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Controller, Get, Post } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";

@Controller("api/submittals")
export class SubmittalsController {
    @Post()
    private add(req: Request, res: Response) {
        Logger.Info(req.body, true);
        return res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
    }
}
