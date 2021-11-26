import {Request, Response} from 'express'
import {Controller, Get, Req, Res} from 'routing-controllers'
import {ajv} from '../utils/ajv-service'
import {JSONSchemaType} from 'ajv'
import httpStatus from 'http-status'
// import { Person } from 'typing/types'

type RefType = 'gov' | 'map' | 'own'
type AgeType = 'A' | 'C' | 'U'
type SexType = 'F' | 'M' | 'U'
type RegionType = 'E' | 'W' | 'S' | 'N' | 'M'
// type OrderType = 'ASC' | 'DESC'

interface PetQuery {
  ref?: RefType
  age?: AgeType
  sex?: SexType
  region?: RegionType
  order?: OrderType
}


const schema: JSONSchemaType<PetQuery> = {
  type: 'object',
  properties: {
    ref: {type: 'string', enum: ['gov', 'map', 'own'], nullable: true},
    age: {type: 'string', enum: ['A', 'C', 'U'], nullable: true},
    sex: {type: 'string', enum: ['F', 'M', 'U'], nullable: true},
    region: {type: 'string', enum: ['E', 'W', 'S', 'N', 'M'], nullable: true},
    order: {type: 'string', enum: ['ASC', 'DESC'], nullable: true},
  },
}

@Controller('/pet')
/**
 * @class PetController
 */
export class PetController {
   /**
   * @param  {Request} req
   * @param  {Response} res
   * @return {Promise<Response>}
   */
  @Get('/search')
  async getAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const valid: boolean = ajv.validate(schema, req.query)
    if (!valid) return res.status(httpStatus.BAD_REQUEST).json(ajv.errors)
    else return res.status(200).send('OK')
}
}
