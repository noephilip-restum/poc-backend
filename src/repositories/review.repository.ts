import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PocDbDataSource} from '../datasources';
import {Review, ReviewRelations} from '../models';

export class ReviewRepository extends DefaultCrudRepository<
  Review,
  typeof Review.prototype._id,
  ReviewRelations
> {
  constructor(
    @inject('datasources.pocDb') dataSource: PocDbDataSource,
  ) {
    super(Review, dataSource);
  }
}
