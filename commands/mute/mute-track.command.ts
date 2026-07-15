import type { Arguments, CommandModule } from "yargs";
import type { MuteCommandArguments, TrackCommandArguments } from "./track.command";
import { send, type OscConnection } from "../../osc/osc";

export type MuteTrackCommandArguments = { }
  & TrackCommandArguments
  & MuteCommandArguments
  & OscConnection
  & Arguments

export const muteTrackCommand: CommandModule = {
  command: 'track <trackno> [state]',
  describe: 'Mute track.',
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
  handler: (argv: MuteTrackCommandArguments) => {
    try {
      const address = argv.state !== undefined
        ? `/track/${argv.trackno}/mute`
        : `/track/${argv.trackno}/mute/toggle`

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