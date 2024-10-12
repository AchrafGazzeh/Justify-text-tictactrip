import { Request, Response, NextFunction } from 'express';
import Client from '../../index';
const { isAuthenticated } = require('../utils/auth.utils');

module.exports = {
    tokenCheck: async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.headers);
        try {
            if (req.headers.authorization === undefined) {
                return res.status(400).json({ message: 'Token not found' });
            }

            const token: string = req.headers.authorization.split(' ')[1];

            const tokenExists = await isAuthenticated(Client, token);
            if (!tokenExists) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            res.locals.token = token;
            next();
        } catch (error: unknown) {
            console.error(`Error during token check: ${(error as Error).message}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
