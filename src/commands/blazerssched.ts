import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'blazerssched',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info('Trail Blazers 2022-2023 Schedule')
  },
}

module.exports = command
