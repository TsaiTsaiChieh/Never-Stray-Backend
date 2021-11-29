/* eslint-disable require-jsdoc */
import {JSONSchemaType} from 'ajv'
import {Request, Response} from 'express'
import httpStatus from 'http-status'
import {PetModel} from '../models/pet.model'
import {Controller, Get, Req, Res} from 'routing-controllers'

import {ajv} from '../utils/ajv-service'

const schema: JSONSchemaType<PetQuery> = {
  type: 'object',
  properties: {
    ref: {type: 'string', enum: ['gov', 'map', 'own'], nullable: true},
    age: {type: 'string', enum: ['A', 'C', 'U'], nullable: true},
    sex: {type: 'string', enum: ['F', 'M', 'U'], nullable: true},
    region: {type: 'string', enum: ['E', 'W', 'S', 'N', 'M'], nullable: true},
    order: {type: 'string', enum: ['ASC', 'DESC'], nullable: true},
    limit: {
      type: 'number',
      default: parseInt(process.env.PET_QUERY_LIMIT!),
      minimum: 1,
      maximum: 100,
      nullable: true,
    },
    page: {type: 'number', default: 1, minimum: 1, nullable: true},
  },
}

@Controller('/pet')
export class PetController {
  private petModel: PetModel

  constructor() {
    this.petModel = new PetModel()
  }

  @Get('/search')
  async getAll(@Req() req: Request, @Res() res: Response): Promise<any> {
    const reqQuery: PetQuery = req.query
    const query: PetQuery = {
      ref: reqQuery.ref,
      age: reqQuery.age,
      sex: reqQuery.sex,
      region: reqQuery.region,
      order: reqQuery.order,
      limit: reqQuery.limit ? Number(reqQuery.limit) : undefined,
      page: reqQuery.page ? Number(reqQuery.page): undefined,
    }
    const valid: boolean = ajv.validate(schema, query)

    if (!valid) return res.status(httpStatus.BAD_REQUEST).json(ajv.errors)
    else {
      const result = await this.petModel.getAll(query)
      return res.status(200).json(result)
    }
  }
}
