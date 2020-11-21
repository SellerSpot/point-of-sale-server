import { RequestHandler, Request, Response } from 'express';

export const homeController: RequestHandler = (req: Request, res: Response) => {
    res.send('SellerSpot POS Server API service');
};
