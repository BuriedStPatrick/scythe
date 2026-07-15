import type { Arguments, CommandModule } from "yargs";
import type { MuteCommandArguments, TrackCommandArguments } from "./mute.command";
import { send, type OscConnection } from "../../osc/osc";

export type MuteMasterCommandArguments = { }
  & MuteCommandArguments
  & OscConnection
  & Arguments

export const muteMasterCommand: CommandModule = {
  command: 'master [state]',
  describe: 'Mute MASTER track.',
  builder: args => args
    .option('port', {
      type: 'number',
      describe: 'The OSC server port',
      default: 8000
    })
    .option('host', {
      type: 'string',
      describe: 'The OSC server host',
      default: '127.0.0.1'
    }),
  handler: (argv: MuteMasterCommandArguments) => {
    try {
      const address = argv.state !== undefined
        ? `/track/0/mute`
        : `/track/0/mute/toggle`

      const argumentValue = argv.state === undefined
        ? undefined
        : argv.state === 'on' ? '1' : '0'

      send({
        address,
        host: argv.host,
        port: argv.port,
        type: 'b',
        argument: argumentValue
      })
    } catch(err) {
      console.error(err)

      process.exit(1)
    }
  }
}