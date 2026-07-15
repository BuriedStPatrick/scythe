import type { Arguments, CommandModule } from "yargs";
import type { OscConnection } from "../../osc/osc";
import { unmuteTrackCommand } from "./unmute-track.command";
import { unmuteMasterCommand } from "./unmute-master.command";

export type UnmuteCommandArguments = { }
  & OscConnection
  & Arguments

export const unmuteCommand: CommandModule = {
  command: 'unmute',
  describe: 'Unmute target.',
  builder: (args) => args
    .demandCommand(1)
    .command(unmuteTrackCommand)
    .command(unmuteMasterCommand)
}