import { Injectable } from 'injection-js';

@Injectable()
export class ExampleService {

  public log(str): string {
    console.log(Date.now(), str);
    return Date.now() + ' ' + str;
  }

  public status() {
    return {
      status: 'OK'
    };
  }
}
