import 'mocha';
import * as request from 'supertest';
import {app} from './example/my-example-app';
import * as chai from 'chai';
const expect = chai.expect;


describe('ExampleResource', () => {

  it('should respond with a status: ok object when a user requests /example/example', (done) => {

    request(app.expressApp)
      .get('/example/example')
      .expect(200)
      .expect({status: 'OK'}, done);
  });

  it('should not require that every method have an @Path() decorator on it', (done) => {
    request(app.expressApp)
      .get('/example')
      .expect(200)
      .expect({status: 'OK'}, done);
  });

  it('should be able to pass path params to the route handler', (done) => {
    request(app.expressApp)
      .post('/example/example-post/with-path-param')
      .expect(200)
      .expect({
        param: 'with-path-param',
        post: 'worked'
      }, done);
  });

  it('should be able to pass a query param to the route handler', (done) => {
    request(app.expressApp)
      .get('/example/example-two/param-segment?derpQueryParam=foo')
      .expect(200)
      .expect({
        derp: true,
        pathParam: 'param-segment',
        queryParam: 'foo'
      }, done);
  });

  it('should be able to parse the body of a post request and create the correct instance (object mapping)', (done) => {
    request(app.expressApp)
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

  it('should always return json, even if an error gets thrown on the server', (done) => {
    request(app.expressApp)
      .get('/example/error')
      .expect(500)
      .expect((res) => {
        if (typeof res.body.stacktrace === 'string') {
          res.body.stacktrace = 'SUCCESS'
        }
      })
      .expect({
        status: 500,
        message: 'This is an error',
        stacktrace: 'SUCCESS'
      }, done);
  });

  it('should be able to ge a list of Persons out of the sqlite db', (done) => {
    request(app.expressApp)
      .get('/example/person')
      .expect(200)
      .end(function (err, res) {
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it('should be able to get a single person out of the database by id param', (done) => {
    request(app.expressApp)
      .get('/example/person/1')
      .expect(200)
      .expect({
        id: 1,
        firstName: 'Derek',
        middleName: 'Jon',
        lastName: 'Pavao',
        dob: '1981-03-26',
        active: false
      })
      .end(function (err, res) {
        console.log('res', res);
        done()
      });
  });

  it('should return a 400 if data posted to it doesn\'t pass validation', (done) => {
    request(app.expressApp)
      .post('/example/person')
      .send({
        firstName: 'Amanda',
        lastName: '',
        middleName: 'Carter',
        dob: '1985-07-14',
        active: false
      })
      .expect(400, done)

  });

});
