import {Entity, hasOne, model, property, belongsTo} from '@loopback/repository';
import {UserCredential} from './user-credential.model';
import {Review} from './review.model';

@model({settings: {strict: false}})
export class Users extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  account_status: string;

  @property({
    type: 'string',
    required: true,
  })
  account_role: string;

  @hasOne(() => UserCredential)
  userCredential?: UserCredential;

  @belongsTo(() => Review)
  reviewId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
