import request from 'supertest';
import { firstText, firstTextJustifie,secondText,secondTextJustifie} from './texts';
import justifyText from '../src/utils/justify.utils';


describe( 'Justify short text', () => {
    it( 'should justify short text', () => {        
        expect( justifyText( firstText ) ).toBe( firstTextJustifie );
    } )})

describe( 'Justify long text', () => {
    it( 'should justify long text', () => {        
        expect( justifyText( secondText ) ).toBe( secondTextJustifie );
    } )})

