import type { Arguments, CommandModule } from "yargs";
import { send, type OscConnection } from "../../../osc/osc";

export type MuteToggleMasterCommandArguments = { }
  & OscConnection
  & Arguments

export const muteToggleMasterCommand: CommandModule = {
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
  handler: (argv: MuteToggleMasterCommandArguments) => {
    send({
      address: `/track/0/mute/toggle`,
      host: argv.host,
      port: argv.port,
      type: 'b',
      argument: '1'
    })
  }
}