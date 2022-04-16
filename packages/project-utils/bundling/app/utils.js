const { version } = require('@webiny/project-utils/package.json')
const { globalConfig } = require('@webiny/global-config')

module.exports.applyDefaults = () => {
  let telemetry = false

  if (!('REACT_APP_USER_ID' in process.env)) {
    process.env.REACT_APP_USER_ID = globalConfig.get('id')
  }

  if (!('REACT_APP_WEBINY_TELEMETRY' in process.env)) {
    process.env.REACT_APP_WEBINY_TELEMETRY = String(telemetry)
  }

  if (!('INLINE_RUNTIME_CHUNK' in process.env)) {
    process.env.INLINE_RUNTIME_CHUNK = 'true'
  }

  if (!('REACT_APP_WEBINY_VERSION' in process.env)) {
    process.env.REACT_APP_WEBINY_VERSION = version
  }

  if ('WEBINY_MULTI_TENANCY' in process.env) {
    process.env.REACT_APP_WEBINY_MULTI_TENANCY =
      process.env.WEBINY_MULTI_TENANCY
  }
}
