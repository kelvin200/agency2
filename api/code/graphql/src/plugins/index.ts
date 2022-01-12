import { createBaseGraphQL } from './base.gql'
import { createAthenaGraphQL } from './graphql'

export default () => [createBaseGraphQL(), createAthenaGraphQL()]
