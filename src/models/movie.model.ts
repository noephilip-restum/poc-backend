import {Entity, model, property, referencesMany, hasMany} from '@loopback/repository';
import {Actor} from './actor.model';
import {Review} from './review.model';

@model({settings: {strict: false}})
export class Movie extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;

  @property({
    type: 'string',
    required: true,
  })
  year_of_release: string;

  @property({
    type: 'string',
    required: true,
  })
  image_link: string;

  @referencesMany(() => Actor)
  actorIds: string[];

  @hasMany(() => Review)
  reviews: Review[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Movie>) {
    super(data);
  }
}

export interface MovieRelations {
  // describe navigational properties here
}

export type MovieWithRelations = Movie & MovieRelations;
