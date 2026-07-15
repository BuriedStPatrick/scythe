import type { Arguments, CommandModule } from "yargs";
import { send, type OscConnection } from "../../osc/osc";

export type StopCommandArguments = {
}
  & OscConnection
  & Arguments

export const stopCommand: CommandModule = {
  command: 'stop',
  describe: 'Stop playback.',
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
  handler: (argv: StopCommandArguments) => {
    send({
      address: `/stop`,
      host: argv.host,
      port: argv.port,
      type: 't'
    })
  }
}