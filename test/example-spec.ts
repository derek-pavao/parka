import {app} from "./example/my-example-app";
import * as request from 'supertest';

describe('ExampleSpec', () => {


  it('should start a server on port 4000', (done) => {

    request(app.expressApp)
      .get('/')
      .expect(200, done)
  });
});
