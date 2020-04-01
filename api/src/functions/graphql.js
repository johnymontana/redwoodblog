import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api'
import importAll from '@redwoodjs/api/importAll.macro'
import { ApolloServer } from 'apollo-server-lambda'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import neo4j from 'neo4j-driver'

const sdls = importAll('api', 'graphql')

console.log('SCHEMAS')
console.log(JSON.stringify(sdls, undefined, 4))

const typeDefs = sdls.contacts.schema + sdls.posts.schema

//const tempSchema = makeMergedSchema({ schemas, services })
//console.log(tempSchema)

// export const handler = createGraphQLHandler({
//   schema: makeMergedSchema({
//     schemas,
//     services: makeServices({ services }),
//   }),
//   db,
// })

const driver = neo4j.driver(
  process.env.NEO4J_URL,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
  { encrypted: true }
)

const server = new ApolloServer({
  schema: makeAugmentedSchema({ typeDefs }),
  context: { driver },
  playground: true,
  introspection: true,
})

exports.handler = server.createHandler()
