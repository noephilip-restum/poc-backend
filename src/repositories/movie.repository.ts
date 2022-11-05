import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  ReferencesManyAccessor,
  repository,
} from '@loopback/repository';
import {PocDbDataSource} from '../datasources';
import {Actor, Movie, MovieRelations, Review} from '../models';
import {ActorRepository} from './actor.repository';
import {ReviewRepository} from './review.repository';

export class MovieRepository extends DefaultCrudRepository<
  Movie,
  typeof Movie.prototype.id,
  MovieRelations
> {
  public readonly actors: ReferencesManyAccessor<
    Actor,
    typeof Movie.prototype.id
  >;

  public readonly reviews: HasManyRepositoryFactory<
    Review,
    typeof Movie.prototype.id
  >;

  constructor(
    @inject('datasources.pocDb') dataSource: PocDbDataSource,
    @repository.getter('ActorRepository')
    protected actorRepositoryGetter: Getter<ActorRepository>,
    @repository.getter('ReviewRepository')
    protected reviewRepositoryGetter: Getter<ReviewRepository>,
  ) {
    super(Movie, dataSource);
    this.reviews = this.createHasManyRepositoryFactoryFor(
      'reviews',
      reviewRepositoryGetter,
    );
    this.registerInclusionResolver('reviews', this.reviews.inclusionResolver);
    this.actors = this.createReferencesManyAccessorFor(
      'actors',
      actorRepositoryGetter,
    );
    this.registerInclusionResolver('actors', this.actors.inclusionResolver);
  }
}
