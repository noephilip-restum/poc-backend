// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId} from '@loopback/security';
import {compare} from 'bcryptjs';
import {Users, UsersRelations} from '../models';
import {UsersRepository} from '../repositories';

/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export type Credentials = {
  email: string;
  password: string;
};

// interface convertedProfile {
//   [securityId]: string;
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
// }
export class MyUserService implements UserService<Users, Credentials> {
  constructor(
    @repository(UsersRepository) public userRepository: UsersRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<Users> {
    const invalidCredentialsError = 'Invalid esdsdmail or password.';

    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepository.findCredentials(
      foundUser._id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: Users): any {
    const converted = {
      [securityId]: user._id?.toString,
      account_role: user.account_role,
      account_status: user.account_status,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      email: user.email,
    };
    return converted;
  }

  //function to find user by id
  async findUserById(id: string): Promise<Users & UsersRelations> {
    const userNotfound = 'invalid User';
    const foundUser = await this.userRepository.findOne({
      where: {_id: id},
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(userNotfound);
    }
    return foundUser;
  }
}
