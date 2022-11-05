import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocDbDataSource} from '../datasources';
import {Actor, ActorRelations} from '../models';

export class ActorRepository extends DefaultCrudRepository<
  Actor,
  typeof Actor.prototype.id,
  ActorRelations
> {
  constructor(@inject('datasources.pocDb') dataSource: PocDbDataSource) {
    super(Actor, dataSource);
  }
}
