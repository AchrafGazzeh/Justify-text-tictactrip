import { Request, Response } from 'express';
import Client from '../../index';
const { generateToken, setToken } = require( '../utils/auth.utils' );

export const login = async( req: Request, res: Response ) => {
    const emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if ( typeof req.body.email !== 'string' || !req.body.email.match( emailRegex ) ) {
        return res.status( 400 ).json( { message: 'Invalid email address' } );
    }
    const token: string = generateToken();
    await setToken( Client, req.body.email, token );

    res.status( 200 ).json( { token: token } );
};