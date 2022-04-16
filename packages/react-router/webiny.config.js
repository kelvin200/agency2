const { createWatchPackage, createBuildPackage } = require('@m/project-utils')

module.exports = {
  commands: {
    build: createBuildPackage({ cwd: __dirname }),
    watch: createWatchPackage({ cwd: __dirname }),
  },
}
