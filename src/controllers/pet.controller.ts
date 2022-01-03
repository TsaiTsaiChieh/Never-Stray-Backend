/* eslint-disable require-jsdoc */
import {JSONSchemaType} from 'ajv'
import {Request, Response} from 'express'
import httpStatus from 'http-status'
import {Controller, Get, Req, Res} from 'routing-controllers'
import safeAwait from 'safe-await'

import {City, Region} from '../entity/area.entity'
import {Age, Kind, Pet, Ref, Sex} from '../entity/pet.entity'
import {PetModel} from '../models/pet.model'
import {ajv} from '../utils/ajv-service'

const schema: JSONSchemaType<PetQuery> = {
  type: 'object',
  properties: {
    kind: {type: 'string', enum: Object.values(Kind), nullable: true},
    city: {type: 'string', enum: Object.values(City), nullable: true},
    ref: {type: 'string', enum: Object.values(Ref), nullable: true},
    age: {type: 'string', enum: Object.values(Age), nullable: true},
    sex: {type: 'string', enum: Object.values(Sex), nullable: true},
    region: {type: 'string', enum: Object.values(Region), nullable: true},
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
      kind: reqQuery.kind,
      city: reqQuery.city,
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
