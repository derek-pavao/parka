import {MyExampleApp} from "../example/my-example-app.ts";
import * as request from 'supertest';

describe('ExampleSpec', () => {

    beforeEach(() => {
        console.log('test before each', MyExampleApp.app);
    });

    it ('should start a server on port 4000', (done) => {
        console.log('MyExampleApp.app', MyExampleApp.app);
        request(MyExampleApp.app)
            .get('/')
            .expect(200, done)
    });
});
