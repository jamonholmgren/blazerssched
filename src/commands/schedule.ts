import { GluegunCommand } from 'gluegun'

type ScheduleResponse = {
  schedule: Array<{
    date: string
    time: string
    location: string
    opponent: string
  }>
}

const command: GluegunCommand = {
  name: 'schedule',
  run: async (toolbox) => {
    const { print, http, prompt } = toolbox

    const baseURL = 'https://raw.githubusercontent.com'
    const path =
      '/jamonholmgren/NBAPlayers/master/blazers-2022-2023-schedule.json'

    const response = await http.create({ baseURL }).get(path)

    const { schedule } = response.data as ScheduleResponse

    print.info('SCHEDULE')

    const replaceTeamName = await prompt.ask({
      type: 'input',
      name: 'teamName',
      message: 'What team do you want to replace with another team?',
    })

    const teamName = replaceTeamName.teamName

    const replaceWithTeamName = await prompt.ask({
      type: 'input',
      name: 'withTeamName',
      message: `What team do you want to replace ${teamName} with?`,
    })

    const withTeamName = replaceWithTeamName.withTeamName

    let spinner = print.spin('Creating data...')

    // turn the schedule data into a table
    const tableData = schedule.map((game) => {
      return [
        game.date,
        game.time,
        game.location,
        game.opponent.replace(teamName, withTeamName),
      ]
    })

    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })

    spinner.succeed('Data created!')

    print.info('')

    print.table(tableData)
  },
}

module.exports = command
