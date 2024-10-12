const router = require( 'express' ).Router();
const authController = require( './controllers/auth' );
const justifyController = require( './controllers/justify' );
const authMiddleware = require( './middleware/auth' );
const limitMiddleware = require( './middleware/limit' );
const contentTypeMiddleware = require( './middleware/contentType' );
import { Router, Request, Response } from 'express';

router.post( '/api/token', contentTypeMiddleware.isJson, authController.login );
router.post( '/api/justify', authMiddleware.tokenCheck, contentTypeMiddleware.isTextPlain,
    limitMiddleware.limitReached, justifyController.postJustify );
    router.get('/', (req: Request, res: Response) => {
      res.send('Welcome to the Tictactrip interview test by Achraf Gazzah');
  });
    
module.exports = router;