import type { Arguments, CommandModule } from "yargs";
import { send, type OscConnection } from "../../osc/osc";

export type PlayCommandArguments = {
}
  & OscConnection
  & Arguments

export const playCommand: CommandModule = {
  command: 'play',
  describe: 'Start/Pause playback.',
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
  handler: (argv: PlayCommandArguments) => {
    send({
      address: `/play`,
      host: argv.host,
      port: argv.port,
      type: 't'
    })
  }
}