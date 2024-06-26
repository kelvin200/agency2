import { createSecurityContext } from '@webiny/api-security'
import { createStorageOperations as securityStorageOperations } from '@webiny/api-security-so-ddb'
import { createTenancyContext } from '@webiny/api-tenancy'
import { createStorageOperations as tenancyStorageOperations } from '@webiny/api-tenancy-so-ddb'

export default ({ documentClient }) => [
  /**
   * Create Tenancy app in the `context`.
   */
  createTenancyContext({
    storageOperations: tenancyStorageOperations({ documentClient }),
  }),

  /**
   * Create Security app in the `context`.
   */
  createSecurityContext({
    storageOperations: securityStorageOperations({ documentClient }),
  }),
]
