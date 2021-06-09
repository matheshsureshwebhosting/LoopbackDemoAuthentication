// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {UuidHelper} from '../helpers/uuid';
import {Users} from "../models";
import {UsersRepository} from "../repositories";
import {JwtToken} from '../service/jwt';
import {CreaterHashpwd} from '../service/passwordhash';
export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject('service.passwordhash')             //dependency injection from appplication.ts
    public createrHashpwd: CreaterHashpwd,
    @inject('service.Jwt')
    public jwtToken: JwtToken,
    @inject('service.UUID')
    public uuidHelper: UuidHelper,
  ) { }

  @post('/create')
  @response(200, {
    description: 'Userinfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async createacc(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {
          title: 'NewUsers',
          exclude: ['id'],
        }),
      },
    },
  }) userinfos: Users) {
    const hasspwd = await this.createrHashpwd.hashpassword(userinfos.password)
    userinfos.password = hasspwd
    userinfos["clientid"] = await this.uuidHelper.createUUID()
    const token = await this.jwtToken.createToken(userinfos.email)
    userinfos.token = token
    const saveUser = await this.usersRepository.create(userinfos)
    return saveUser
  }
}
