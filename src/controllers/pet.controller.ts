import {JSONSchemaType} from 'ajv'
import {Request, Response} from 'express'
import httpStatus from 'http-status'
import {Controller, Get, Req, Res} from 'routing-controllers'

import {ajv} from '../utils/ajv-service'

interface PetQuery {
  ref?: PetRefType
  age?: PetAgeType
  sex?: PetSexType
  region?: AreaRegionType
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
