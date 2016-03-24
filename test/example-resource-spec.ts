import * as request from 'supertest';
import {MyExampleApp} from './example/my-example-app.ts';


describe('ExampleResource', () => {

    it ('should respond with a status: ok object when a user requests /example/example', (done) => {

        request(MyExampleApp.app)
            .get('/example/example')
            .expect(200)
            .expect({status: 'OK'}, done);
    });

    it ('should not require that every method have an @Path() decorator on it', (done) => {
        request(MyExampleApp.app)
            .get('/example')
            .expect(200)
            .expect({status: 'OK'}, done);
    });

    it ('should be able to pass path params to the route handler', (done) => {
        request(MyExampleApp.app)
            .post('/example/example-post/with-path-param')
            .expect(200)
            .expect({
                param: 'with-path-param',
                post: 'worked'
            }, done);
    });

    it ('should be able to pass a query param to the route handler', (done) => {
        request(MyExampleApp.app)
        .get('/example/example-two/param-segment?derpQueryParam=foo')
        .expect(200)
        .expect({
            derp: true,
            pathParam: 'param-segment',
            queryParam: 'foo'
        }, done);
    });

    it ('should be able to parse the body of a post request and create the correct instance (object mapping)', (done) => {
        request(MyExampleApp.app)
        .post('/example/example-post-with-body')
        .send({
            status: 'OK',
            statusMessage: 'Great Job'
        })
        .expect(200)
        .expect({
            status: 'OK',
            statusMessage: 'Great Job',
            isCorrectInstance: true
        }, done)

    });

});
