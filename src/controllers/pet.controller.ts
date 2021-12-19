/* eslint-disable require-jsdoc */
import {JSONSchemaType} from 'ajv'
import {Request, Response} from 'express'
import httpStatus from 'http-status'
import {Controller, Get, Req, Res} from 'routing-controllers'
import safeAwait from 'safe-await'

import {Pet} from '../entity/pet.entity'
import {PetModel} from '../models/pet.model'
import {ajv} from '../utils/ajv-service'

const schema: JSONSchemaType<PetQuery> = {
  type: 'object',
  properties: {
    ref: {type: 'string', enum: ['gov', 'map', 'own'], nullable: true},
    age: {type: 'string', enum: ['A', 'C', 'U'], nullable: true},
    sex: {type: 'string', enum: ['F', 'M', 'U'], nullable: true},
    region: {type: 'string', enum: ['E', 'W', 'S', 'N', 'M'], nullable: true},
    order: {
      type: 'string',
      enum: [
        'id',
        'ref',
        'city_id',
        'kind',
        'sex',
        'color',
        'age',
        'created_at',
        'updated_at',
      ],
      nullable: true,
    },
    ascend: {type: 'integer', default: 1, enum: [0, 1], nullable: true},
    limit: {
      type: 'integer',
      default: parseInt(process.env.PET_QUERY_LIMIT!),
      minimum: 1,
      maximum: 100,
      nullable: true,
    },
    page: {type: 'integer', default: 1, minimum: 1, nullable: true},
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
      ascend: reqQuery.ascend ? Number(reqQuery.ascend) : undefined,
      limit: reqQuery.limit ? Number(reqQuery.limit) : undefined,
      page: reqQuery.page ? Number(reqQuery.page) : undefined,
    }
    const valid: boolean = ajv.validate(schema, query)

    if (!valid) return res.status(httpStatus.BAD_REQUEST).json(ajv.errors)
    else {
      const [error, result]: [ErrorType, Pet[]] = await safeAwait(
        this.petModel.getAll(query),
      )
      if (error) {
        return res
          .status(error.code)
          .json(error.isOperational ? error : error.status)
      }
      return res.json(result)
    }
  }
}
