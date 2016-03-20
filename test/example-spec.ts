import {MyApp} from "../example/app.ts";
import * as request from 'supertest';

describe('ExampleSpec', () => {

    beforeEach(() => {
        console.log('test before each', MyApp.app);
    });

    it ('should start a server on port 4000', (done) => {
        console.log('MyApp.app', MyApp.app);
        request(MyApp.app)
            .get('/')
            .expect(200, done)
    });
});
