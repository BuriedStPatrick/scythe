import type { Arguments, ArgumentsCamelCase, Argv, CommandModule } from "yargs";
import { muteTrackCommand } from "./mute-track.command";
import type { OscConnection } from "../../osc/osc";
import { muteMasterCommand } from "./mute-master.command";

export type MuteToggleState = 'on' | 'off'

export type MuteCommandArguments = {
  state?: MuteToggleState
}
  & OscConnection
  & Arguments

export const muteCommand: CommandModule = {
  command: 'mute',
  describe: 'Mute target.',
  builder: (args) => args
    .demandCommand(1)
    .positional('state', {
      type: 'string',
      required: false,
      describe: 'Set the state explicitly to ON (the target will be muted) or OFF (the target will be unmuted). Omit to toggle current state.',
      choices: ['on', 'off'] as const
    })
    .command(muteTrackCommand)
    .command(muteMasterCommand)
}