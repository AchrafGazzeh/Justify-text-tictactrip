import request from 'supertest';
import { firstText } from './texts';
const { Client, app } = require( '../index' );

describe( 'Request to /api/justify', () => {

    afterAll( () => {
        Client.quit();
    } );

    let responseAuth: request.Response;

    beforeAll( async() => {
        responseAuth = await request( app ).post( '/api/token' ).send( {
            email: 'test@test.com'
        } );
        await Client.set( responseAuth.body.token, 79999 );
    } );

    describe( 'Justify text with 5 words with 79999 words already justified', () => {

        it( 'Respond with 402', async() => {

            const response: request.Response = await request( app ).post( '/api/justify' )
                .set( 'Authorization', 'bearer ' + responseAuth.body.token )
                .set( 'Content-Type', 'text/plain' )
                .send( firstText );

            expect( response.statusCode ).toBe( 402 );
        } );
    } );
} );