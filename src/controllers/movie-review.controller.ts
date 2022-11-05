import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Movie,
  Review,
} from '../models';
import {MovieRepository} from '../repositories';

export class MovieReviewController {
  constructor(
    @repository(MovieRepository) protected movieRepository: MovieRepository,
  ) { }

  @get('/movies/{id}/reviews', {
    responses: {
      '200': {
        description: 'Array of Movie has many Review',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Review)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Review>,
  ): Promise<Review[]> {
    return this.movieRepository.reviews(id).find(filter);
  }

  @post('/movies/{id}/reviews', {
    responses: {
      '200': {
        description: 'Movie model instance',
        content: {'application/json': {schema: getModelSchemaRef(Review)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Movie.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {
            title: 'NewReviewInMovie',
            exclude: ['id'],
            optional: ['movieId']
          }),
        },
      },
    }) review: Omit<Review, 'id'>,
  ): Promise<Review> {
    return this.movieRepository.reviews(id).create(review);
  }

  @patch('/movies/{id}/reviews', {
    responses: {
      '200': {
        description: 'Movie.Review PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {partial: true}),
        },
      },
    })
    review: Partial<Review>,
    @param.query.object('where', getWhereSchemaFor(Review)) where?: Where<Review>,
  ): Promise<Count> {
    return this.movieRepository.reviews(id).patch(review, where);
  }

  @del('/movies/{id}/reviews', {
    responses: {
      '200': {
        description: 'Movie.Review DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Review)) where?: Where<Review>,
  ): Promise<Count> {
    return this.movieRepository.reviews(id).delete(where);
  }
}
