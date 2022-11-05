import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocDbDataSource} from '../datasources';
import {UserCredential, UserCredentialRelations} from '../models';

export class UserCredentialRepository extends DefaultCrudRepository<
  UserCredential,
  typeof UserCredential.prototype._id,
  UserCredentialRelations
> {
  constructor(
    @inject('datasources.pocDb') dataSource: PocDbDataSource,
  ) {
    super(UserCredential, dataSource);
  }
}
