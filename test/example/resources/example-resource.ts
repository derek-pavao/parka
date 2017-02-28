import * as express from 'express';
import {Path} from "../../../src/parka";
import {GET} from "../../../src/parka";
import {PathParam} from '../../../src/parka';
import {QueryParam} from '../../../src/parka';
import {POST} from '../../../src/parka';
import {DELETE} from '../../../src/parka';
import {RequestBody} from '../../../src/parka';

import * as Promise from 'bluebird';
import {merge} from 'lodash';
import {StatusModel} from "../models/status-model";
import {PersonModel} from '../models/person-model';
import {ExampleService} from '../services/example-service';
import {PersonService} from '../services/person-service';


@Path('/example')
export class ExampleResource {

  private req: express.Request;
  private res: express.Response;

  constructor(private personService: PersonService) {}

  @GET
  @Path('/example')
  public exampleGet() {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.personService.status());
      }, 0);
    });
  }

  @GET
  public exampleGetWithNoPath() {
    return {
      status: 'OK'
    };
  }

  @GET
  @Path('/example-two/:withParam')
  public exampleGetTwo(@PathParam('withParam') withParam: string, @QueryParam('derpQueryParam') derpQueryParam?: string) {

    return {
      derp: true,
      pathParam: withParam,
      queryParam: derpQueryParam
    };
  }

  @POST
  @Path('/example-post/:param')
  public examplePost(@PathParam('param') param: string) {
    return {
      param,
      post: 'worked'
    };
  }

  @POST
  @Path('/example-post-with-body')
  public examplePostWithBody(@RequestBody(StatusModel) body: StatusModel) {

    return merge(body, {
      isCorrectInstance: body instanceof StatusModel ? true : false
    });
  }

  @POST
  @Path('/example-post-with-body/:andParam')
  public examplePostWithBodyAndParam(@RequestBody() body, @PathParam('andParam') param) {
    body.param = param;

    return body;
  }

  @DELETE
  @Path('/example-delete?:param')
  public exampleDelete(@QueryParam('param') param: string) {
    return {
      param,
      delete: 'worked'
    }
  }

  @GET
  @Path('/person')
  public getPersonList() {

    return this.personService.getPersonList();
  }

  @GET
  @Path('/person/:id')
  public getPersonById(@PathParam('id') id) {
    return this.personService.getById(id);
  }

  @POST
  @Path('/person')
  public createPerson(@RequestBody(PersonModel) person: PersonModel) {
    return this.personService.create(person);
  }

  @GET
  @Path('/error')
  public testError() {
    throw new Error('This is an error');
  }



}
