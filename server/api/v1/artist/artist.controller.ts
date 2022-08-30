import { Request, Response } from "express";
import l, { logger } from "../../../common/logger";
import { manageError } from "../../../helper/response.helper";
import ArtistService from "./artist.service";
import { BaseController } from "../_base.controller";
import helperService from "../../../services/helper.service";

export class Controller extends BaseController {
    async get(req: Request, res: Response): Promise<void> {
        try {
            const response = await ArtistService.get({
                offset: req.query?.offset || 0, 
                limit: req.query?.limit || 10
            });
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async getMyArtist(req: Request, res: Response): Promise<void> {
        try {
            const response = await ArtistService.getMyArtist();
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async post(req: Request, res: Response): Promise<void> {
        try {
            const response = await ArtistService.post(req.body);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async postWithImage(req: Request, res: Response): Promise<void> {
        try {
            const response = await ArtistService.postWithImage(req.body, helperService.handleFileDetails(req.file));
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const response = await ArtistService.getById(req.params.id);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async addToMyArtist(req: Request, res: Response): Promise<void> {
        try {
            const response = await ArtistService.addToMyArtist(req.params.id);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        try {
            const response = await ArtistService.update(req.params.id, req.body);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async updateWithProfile(req: Request, res: Response): Promise<void> {
        try {
            const response = await ArtistService.updateWithProfile(req.params.id, req.body, helperService.handleFileDetails(req.file));
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const response = await ArtistService.delete(req.params.id);
            super.response(res, response, 200, "");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
}

export default new Controller();
