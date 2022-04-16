import { createBuildFunction, createWatchFunction } from '@m/project-utils'

export default {
  commands: {
    build: createBuildFunction({ cwd: __dirname }),
    watch: createWatchFunction({ cwd: __dirname }),
  },
}
