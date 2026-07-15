import type { Arguments, CommandModule } from "yargs";
import { send, type OscConnection } from "../../../osc/osc";

export type MuteToggleTrackCommandArguments = {
  track: number
}
  & OscConnection
  & Arguments

export const muteToggleTrackCommand: CommandModule = {
  command: 'track <track>',
  describe: 'Toggle track mute.',
  builder: args => args
    .positional('track', {
      type: 'number',
      describe: 'The track number to mute toggle.',
      required: true
    })
    .option('port', {
      type: 'number',
      describe: 'The OSC server port',
      default: 8000
    })
    .option('host', {
      type: 'string',
      describe: 'The OSC server host',
      default: '127.0.0.1'
    })
    ,
  handler: (argv: MuteToggleTrackCommandArguments) => {
    send({
      address: `/track/${argv.track}/mute/toggle`,
      host: argv.host,
      port: argv.port,
      type: 'b'
    })
  }
}