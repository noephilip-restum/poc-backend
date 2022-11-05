import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Users,
  Review,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersReviewController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/review', {
    responses: {
      '200': {
        description: 'Review belonging to Users',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Review)},
          },
        },
      },
    },
  })
  async getReview(
    @param.path.string('id') id: typeof Users.prototype._id,
  ): Promise<Review> {
    return this.usersRepository.review(id);
  }
}
