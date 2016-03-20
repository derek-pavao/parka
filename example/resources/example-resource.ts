import * as express from 'express';
import {Path} from "../../src/index";
import {GET} from "../../src/index";
import {PathParam} from '../../src/index';
import {QueryParam} from '../../src/index';
import {POST} from '../../src/index';
import {DELETE} from '../../src/index';
import {RequestBody} from '../../src/index';

import * as Promise from 'bluebird';
import {StatusModel} from "../models/status-model";



@Path('/example')
export class ExampleResource {

    private req: express.Request;
    private res: express.Response;

    @GET
    @Path('/example')
    public exampleGet() {

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve({
                    status: 'OK'
                });
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

        console.log('params', this.req.params);


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
        console.log('body', body);
        body['isCorrectInstance'] = body instanceof StatusModel ? true : false;
        return body;
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




}
