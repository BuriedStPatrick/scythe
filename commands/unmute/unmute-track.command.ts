import type { Arguments, CommandModule } from "yargs";
import { send, type OscConnection } from "../../osc/osc";
import type { UnmuteCommandArguments } from "./unmute.command";

export type TrackCommandArguments = {
  track?: number
}

export type UnmuteTrackCommandArguments = { }
  & TrackCommandArguments
  & UnmuteCommandArguments
  & OscConnection
  & Arguments

export const unmuteTrackCommand: CommandModule = {
  command: 'track <track>',
  describe: 'Unmute track.',
  builder: args => args
    .positional('track', {
      type: 'number',
      describe: 'The track number to unmute.',
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
    }),
  handler: (argv: UnmuteTrackCommandArguments) => {
    send({
      address: `/track/${argv.track}/mute`,
      host: argv.host,
      port: argv.port,
      type: 'b',
      argument: '0'
    })
  }
}