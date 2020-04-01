import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api'
import importAll from '@redwoodjs/api/importAll.macro'

import { db } from 'src/lib/db'

const schemas = importAll('api', 'graphql')
const services = importAll('api', 'services')

console.log('SCHEMAS')
console.log(JSON.stringify(schemas, undefined, 4))

const tempSchema = makeMergedSchema({ schemas, services })
console.log(tempSchema)

export const handler = createGraphQLHandler({
  schema: makeMergedSchema({
    schemas,
    services: makeServices({ services }),
  }),
  db,
})
