import type { Arguments, CommandModule } from "yargs";
import { send, type OscConnection } from "../../osc/osc";

export type PauseCommandArguments = {
}
  & OscConnection
  & Arguments

export const pauseCommand: CommandModule = {
  command: 'pause',
  describe: 'Toggle playback pause.',
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
  handler: (argv: PauseCommandArguments) => {
    send({
      address: `/pause`,
      host: argv.host,
      port: argv.port,
      type: 't'
    })
  }
}