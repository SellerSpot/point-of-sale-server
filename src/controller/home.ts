import { RequestHandler, Request, Response } from 'express';

export const homeController: RequestHandler = (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'SellerSpot POS Server API service',
    });
};
