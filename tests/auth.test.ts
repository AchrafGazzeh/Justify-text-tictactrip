import request from 'supertest';
import { firstText } from './texts';
const { Client, app } = require( '../index' );

describe( 'Auth middleware', () => {

    afterAll( () => {
        Client.quit();
    } );

    let response: request.Response;

    describe( 'Send request without token', () => {
        it( 'should respond with a 400', async() => {
            response = await request( app ).post( '/api/justify' )
                .send( firstText );

            expect( response.statusCode ).toBe( 400 );
        } );
    } );

    describe( 'Send request with an invalid token', () => {
        it( 'should respond with a 400', async() => {
            response = await request( app ).post( '/api/justify' )
                .set( 'Authorization', 'bearer token' )
                // .set( 'Content-Type', 'text/plain' )
                .send( firstText );

            expect( response.statusCode ).toBe( 400 );
        } );
    } );

    describe( 'Send request with a valid token', () => {
        let responseAuth: request.Response;

        beforeAll( async() => {
            responseAuth = await request( app ).post( '/api/token' ).send( {
                email: 'test@test.com'
            } );
        } );

        it( 'code should be 200', async() => {
            response = await request( app ).post( '/api/justify' )
                .set( 'Authorization', 'bearer ' + responseAuth.body.token )
                .set( 'Content-Type', 'text/plain' )
                .send( firstText );

            expect( response.statusCode ).toBe( 200 );
        } );
    } );
} );