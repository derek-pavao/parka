import {Injectable} from 'injection-js';
import {ExampleService} from './example-service';
import {PersonModel} from '../models/person-model';

@Injectable()
export class PersonService {

  constructor(private exampleService: ExampleService) {}

  public status() {
    return this.exampleService.status();
  }

  public getPersonList() {
    return PersonModel.query();
  }

  public getById(id: number) {
    return PersonModel
      .query()
      .findById(id);
  }

  public create(person: PersonModel) {
    return person.$query().insert();
  }

}
