import Ajv from 'ajv'

const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
})

export {ajv}
