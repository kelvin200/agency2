import { createBuildFunction, createWatchFunction } from '@m/project-utils'

const webpack = config => {
  config.externals.push('sharp')
  return config
}

export default {
  commands: {
    build: createBuildFunction({ cwd: __dirname, overrides: { webpack } }),
    watch: createWatchFunction({ cwd: __dirname, overrides: { webpack } }),
  },
}
