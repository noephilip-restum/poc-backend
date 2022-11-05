import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository, BelongsToAccessor} from '@loopback/repository';
import {PocDbDataSource} from '../datasources';
import {UserCredential, Users, UsersRelations, Review} from '../models';
import {UserCredentialRepository} from './user-credential.repository';
import {ReviewRepository} from './review.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype._id,
  UsersRelations
> {
  public readonly userCredential: HasOneRepositoryFactory<
    UserCredential,
    typeof Users.prototype._id
  >;

  public readonly review: BelongsToAccessor<Review, typeof Users.prototype._id>;

  constructor(
    @inject('datasources.pocDb') dataSource: PocDbDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>, @repository.getter('ReviewRepository') protected reviewRepositoryGetter: Getter<ReviewRepository>,
  ) {
    super(Users, dataSource);
    this.review = this.createBelongsToAccessorFor('review', reviewRepositoryGetter,);
    this.registerInclusionResolver('review', this.review.inclusionResolver);
    this.userCredential = this.createHasOneRepositoryFactoryFor(
      'userCredential',
      userCredentialRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredential',
      this.userCredential.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof Users.prototype._id,
  ): Promise<UserCredential | undefined> {
    return this.userCredential(userId)
      .get()
      .catch(err => {
        if (err.code === 'ENTITY_NOT_FOUND') return undefined;
        throw err;
      });
  }
}
