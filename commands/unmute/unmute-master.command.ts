import type { Arguments, CommandModule } from "yargs";
import { send, type OscConnection } from "../../osc/osc";
import type { UnmuteCommandArguments } from "./unmute.command";

export type UnmuteMasterCommandArguments = { }
  & UnmuteCommandArguments
  & OscConnection
  & Arguments

export const unmuteMasterCommand: CommandModule = {
  command: 'master',
  describe: 'Unmute MASTER.',
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
  handler: (argv: UnmuteMasterCommandArguments) => {
    send({
      address: `/track/0/mute`,
      host: argv.host,
      port: argv.port,
      type: 'b',
      argument: '0'
    })
  }
}