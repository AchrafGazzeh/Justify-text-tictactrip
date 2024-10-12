import { Request, Response, NextFunction } from 'express';
import Client from '../../index';

module.exports = {
    limitReached: async( req: Request, res: Response, next: NextFunction ) => {
        const wordsJustified: string | null = await Client.get( res.locals.token );
        const wordsTojustify: number = req.body.split(' ').length;

        res.locals.wordsTojustify = wordsTojustify;
        if ( wordsJustified !== null && parseInt( wordsJustified ) + wordsTojustify >= 80000 ) {
            return res.status( 402 ).send( { message: 'Payment Required' } );
        }

        next();
    }
};