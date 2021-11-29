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
    page: {type: 'number', default: 1, nullable: true},
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
    // const query: PetQuery = {
    //   // ref: <PetRefType> req.query.ref,
    //   // age: <PetAgeType> req.query.age,
    //   // sex: <PetSexType> req.query.sex,
    //   // region: <AreaRegionType> req.query.region,
    //   // order: <OrderType> req.query.order,
    //   // limit: parseInt(req.query.limit) ? req.query.limit : undefined,
    //   // page: Number(req.query.page) ? req.query.page : 0,
    //   ref: reqQuery.ref,
    //   age: reqQuery.age,
    //   sex: reqQuery.sex,
    //   region: reqQuery.region,
    //   order: reqQuery.order,
    //   limit: Number(reqQuery.limit) ? reqQuery.limit : undefined,
    //   page: reqQuery.page,
    // }
    // if (reqQuery.limit) console.log(`${query.limit}-----${typeof(query.limit)}`)
    const a = Number(reqQuery)
    console.log(`${a}, ${typeof(a)}`)

    // const query: PetQuery = req.query
    console.log(req.query.limit)

    const valid: boolean = ajv.validate(schema, query)
    console.log(query)

    if (!valid) return res.status(httpStatus.BAD_REQUEST).json(ajv.errors)
    else return res.status(200).send('OK')
    // else {
    //   // const query: PetQuery = req.query
    //   res.status(200).send(await this.petModel.getAll(query))
    // }
  }
}
